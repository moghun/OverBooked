import 'package:flutter/material.dart';
import 'package:mobile/routes/search_results.dart';
import 'package:mobile/utils/color.dart';
import 'package:mobile/utils/styles.dart';

class Categories extends StatefulWidget {
  const Categories({Key? key}) : super(key: key);
  @override
  State<Categories> createState() => _CategoriesState();
}

class _CategoriesState extends State<Categories> {
  final List categories = [
    {
      'title': 'Computer',
      "subCat": [
        {'title': 'Desktop'},
        {'title': 'Gaming Desktops'},
        {'title': 'Notebook'},
        {'title': 'Gaming Notebooks'},
        {'title': 'All-in-One Computers'},
        {'title': 'Workstation Systems'}
      ]
    },
    {
      'title': 'Components',
      "subCat": [
        {'title': 'CPUs'},
        {'title': 'GPUs'},
        {'title': 'Memory'},
        {'title': 'Motherboards'},
        {'title': 'Computer Cases'},
        {'title': 'Power Supplies'},
        {'title': 'Video Cards'},
        {'title': 'Fans & PC Cooling'},
        {'title': 'SSDs'},
        {'title': 'Hard Drives'},
        {'title': 'USB Flash Drives & Memory Cards'},
      ]
    },
    {
      'title': 'Peripherals',
      "subCat": [
        {'title': 'Monitor'},
        {'title': 'Mouse'},
        {'title': 'Keyboard'},
        {'title': 'Gaming Chair'},
      ]
    },
    {
      'title': 'Consoles',
      "subCat": [
        {'title': 'PS5'},
        {'title': 'PS4'},
        {'title': 'PS3'},
        {'title': 'Xbox One X'},
        {'title': 'Xbox One S'},
      ]
    },
  ];
  var _selectedCat = 0;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        title: Text(
          'Categories',
          style: kAppBarTitleTextStyle,
          textAlign: TextAlign.left,
        ),
        actions: const [
          Icon(
            Icons.search,
            color: Colors.black54,
            size: 28,
          ),
          SizedBox(width: 16)
        ],
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(8),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              SizedBox(
                height: 20,
              ),
              Expanded(
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: 50,
                      margin: const EdgeInsets.only(right: 15),
                      child: ListView.builder(
                        scrollDirection: Axis.vertical,
                        shrinkWrap: true,
                        itemCount: categories.length,
                        itemBuilder: (ctx, i) {
                          return GestureDetector(
                            onTap: () {
                              setState(() {
                                _selectedCat = i;
                              });
                            },
                            child: Container(
                              margin: const EdgeInsets.only(bottom: 25.0),
                              // padding: const EdgeInsets.symmetric(vertical: 45.0),
                              width: 50,
                              constraints: const BoxConstraints(minHeight: 101),
                              alignment: Alignment.center,
                              decoration: BoxDecoration(
                                border: _selectedCat == i
                                    ? Border.all()
                                    : const Border(),
                                color: _selectedCat == i
                                    ? Colors.transparent
                                    : AppColors.primary,
                                borderRadius: BorderRadius.circular(9.0),
                              ),
                              // child: Transform.rotate(
                              //   angle: -pi / 2,
                              child: RotatedBox(
                                quarterTurns: -1,
                                child: Text(
                                  "${categories[i]['title']}",
                                  style: Theme.of(context)
                                      .textTheme
                                      .button!
                                      .copyWith(
                                          color: _selectedCat == i
                                              ? AppColors.primary
                                              : Colors.white),
                                ),
                              ),
                            ),
                          );
                        },
                      ),
                    ),
                    Expanded(
                      flex: 4,
                      child: ListView.builder(
                        itemCount: categories[_selectedCat]['subCat'].length,
                        itemBuilder: (ctx, i) {
                          return InkWell(
                            onTap: (){
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) => SearchResult(
                                          searchQuery: "${categories[_selectedCat]['subCat'][i]['title']}"
                                          //searchQuery: "${categories[_selectedCat]['title']}",
                                        )));
                            },
                            child: Container(
                            margin: const EdgeInsets.only(bottom: 15),
                            padding: const EdgeInsets.all(9.0),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(15.0),
                            ),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: <Widget>[
                                Expanded(
                                  child: Text(
                                      "${categories[_selectedCat]['subCat'][i]['title']}"),
                                ),
                                const Icon(Icons.chevron_right),
                              ],
                            ),
                          ),
                          );
                        },
                      ),
                    )
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
