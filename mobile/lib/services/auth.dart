import 'dart:io';
import 'package:path/path.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:mobile/models/user_obj.dart';
import 'package:mobile/services/service.dart';

class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  User? _userFromFirebase(User? user) {
    return user;
  }

  UserObj? _userFromLocal(User? user) {
    if (_auth.currentUser == null) {
      return null;
    }
    UserObj tempUser = UserObj(
        uid: _auth.currentUser!.uid,
        name: _auth.currentUser!.displayName,
        email: _auth.currentUser!.email,
        photoURL: _auth.currentUser!.photoURL,
        number: _auth.currentUser!.phoneNumber);
    return tempUser;
  }

  Stream<UserObj?> get getCurrentUser {
    return _auth.userChanges().map(_userFromLocal);
  }

  Future changePassword(String newPassword) async {
    try {
      _auth.currentUser?.updatePassword(newPassword);
    } catch (e) {
      print(e.toString());
    }
  }

  Future<void> loginUser(String email, String password) async {
    UserCredential userCredential = await _auth.signInWithEmailAndPassword(
        email: email, password: password);
  }

  Future<void> signUpUser(String email, String password) async {
    UserCredential userCredential = await _auth.createUserWithEmailAndPassword(
        email: email, password: password);
    User user = userCredential.user!;
    Service.addUser(user.uid, email);
  }

  Future<void> signInAnon() async {
    try {
      UserCredential result = await _auth.signInAnonymously();
    } catch (e) {
      print(e.toString());
    }
  }

  Future googleSignIn() async {
    // Trigger the authentication flow
    final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();

    // Obtain the auth details from the request
    final GoogleSignInAuthentication? googleAuth =
        await googleUser?.authentication;

    // Create a new credential
    final credential = GoogleAuthProvider.credential(
      accessToken: googleAuth?.accessToken,
      idToken: googleAuth?.idToken,
    );

    // Once signed in, return the UserCredential
    UserCredential result =
        await FirebaseAuth.instance.signInWithCredential(credential);
    User user = result.user!;
    var userDoc = await Service.userCollection.doc(user.uid).get();
    if (userDoc.exists) {
      return _userFromFirebase(user);
    }
    Service.addUser(user.uid, user.displayName);
  }

  Future signOut() async {
    try {
      return await _auth.signOut();
    } catch (e) {
      print(e.toString());
      return null;
    }
  }

  /*  ************************
      *** UPDATE USER INFO ***
      ************************ */

  Future updatePassword(String oldPass, String newPass) async {
    AuthCredential cred = EmailAuthProvider.credential(
        email: _auth.currentUser!.email!, password: oldPass);
    try {
      await _auth.currentUser!.reauthenticateWithCredential(cred);
      await _auth.currentUser!.updatePassword(newPass);
      return true;
    } catch (e) {
      return null;
    }
  }

  Future updateName(String newName) async {
    try {
      await _auth.currentUser!.updateDisplayName(newName);
      return true;
    } catch (e) {
      return null;
    }
  }

  Future updateSellerName(String newName, String uid) async {
    try {
      var response = await Service.userCollection
          .where('sellerName', isEqualTo: newName)
          .get();
      for (var doc in response.docs) {
        if (doc["sellerName"] == newName) {
          return false;
        }
      }

      await Service.userCollection.doc(uid).update({"sellerName": newName});
      return true;
    } catch (e) {
      return null;
    }
  }

  Future updateMail(String newMail, String pass) async {
    AuthCredential cred = EmailAuthProvider.credential(
        email: _auth.currentUser!.email!, password: pass);
    try {
      await _auth.currentUser!.reauthenticateWithCredential(cred);
      await _auth.currentUser!.updateEmail(newMail);
      return true;
    } catch (e) {
      return null;
    }
  }

  Future updateAvatar(File file) async {
    try {
      var ref = FirebaseStorage.instance.ref();
      String filepath =
          "/profileImages/${_auth.currentUser!.uid}${extension(file.path)}";
      await ref.child(filepath).putFile(file);
      String ppURL = await ref.child(filepath).getDownloadURL();
      await _auth.currentUser!.updatePhotoURL(ppURL);
      return true;
    } catch (e) {
      print(e);
      return null;
    }
  }

  Future deleteAccount(String uid) async {
    try {
      print(_auth.currentUser);
      await _auth.currentUser!.delete();
      final userRef = getUserReference(uid);
      var sellQuery = await Service.productCollection
          .where("seller", isEqualTo: userRef)
          .get();
      for (var element in sellQuery.docs) {
        await element.reference.update({"stocks": -1});
      }
      await userRef.update({"sellerName": "[Deleted User]", "isActive": false});
      await signOut();
      return true;
    } catch (e) {
      return null;
    }
  }

  static DocumentReference getUserReference(String id) {
    return FirebaseFirestore.instance.collection("Users").doc(id);
  }

  Future reAuth(String? pass, bool hasProvider) async {
    print("reauth **************");
    AuthCredential cred;
    if (hasProvider) {
      final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();
      final GoogleSignInAuthentication googleAuth =
          await googleUser!.authentication;
      cred = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );
    } else {
      cred = EmailAuthProvider.credential(
          email: _auth.currentUser!.email!, password: pass!);
    }
    try {
      await _auth.currentUser!.reauthenticateWithCredential(cred);
      return true;
    } catch (e) {
      return null;
    }
  }
}
