$(document).ready(function () {
  var $calendar = document.getElementById("calendar");
  var currentYear = new Date().getFullYear();
  var calendarize = new Calendarize();
  calendarize.buildYearCalendar($calendar, currentYear);
});

function Calendarize() {
  var dataJson = {
    jan: {
      1: "Сайхан амарна"
    },
    feb: {
      1: "Сагсны тэмцээнтэй",
      3: "Шагнал гардуулна даа",
      17: "Жавхлан багшийн лаб 2-ыг хийнэ"
    },
    mar: {
      2: "Энэ лабынхаа хугацааг сунгах уу яах вэ гэдэгээ шийднэ",
      6: "Энд юу бичье дээ байз",
      8: "Эмэгтэйчүүддээ баяр хүргэнэ дээ"
    },
    apr: {
      1: "Бүгдээрээ худлаа ярьцаагаагаарай"
    },
    may: {
      10: "Энэ сард ч ёстой юу ч болдоггүй сар даа"
    },
    jun: {
      6: "Жавхлан багшийн төрсөн өдөр"
    },
    jul: {
      4: "Хичээл амарсаан ураа"
    },
    aug: {
      1: "Хөдөө явдаг цаг даа",
      25: "Хичээл сонголт эхэллээ"
    },
    sep: {
      1: "9-н сарын нэгэн боллоо ерөөсөө бидний баяр даа"
    },
    oct: {
      13: "Сур сур бас дахин сур"
    },
    nov: {
      2: "Сурсаар л бай"
    },
    dec: {
      20: "Өвлийн семистер хаагдах нь дээ",
      30: "Дүн гаргаж дууслаа баярлалаа баяртай"
    }
  }

  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  var dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return {
    getDaysInMonth: function (month, year) {
      var date = new Date(year, month, 1);
      var days = [];
      while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      return days;
    },

    getMonthsInYear: function (year) {
      var date = new Date(2021, 0, 1);
      console.log(date, "********")
      var months = [];
      var monthCount = 0;
      while (monthCount < 12) {
        months.push(new Date(date));
        date.setMonth(date.getMonth() + 1);

        monthCount++;
      }

      return months;
    },

    buildYearCalendar: function (el, year) {
      var _this = this;
      var months = _this.getMonthsInYear(year);

      var opts = {
        showMonth: true,
        showDaysOfWeek: true,
        showYear: true,
      };

      var d = new Date();
      var m = 0;
      var y = d.getFullYear();

      months.forEach(function (a, b) {
        var month = a.getMonth();
        var year = a.getFullYear();

        if (year == y) {
          if (month >= m) {
            var $monthNode = _this.buildMonth(month, year, opts);
            el.appendChild($monthNode);
          }
        } else {
          var $monthNode = _this.buildMonth(month, year, opts);
          el.appendChild($monthNode);
        }
      });
    },

    buildMonth: function (monthNum, year, opts) {
      var _this = this;
      var dtm = new Date(year, monthNum, 1);
      var dtmMonth = dtm.getMonth();

      var prevM = new Date(dtm.setMonth(dtmMonth - 1));
      var nextM = new Date(dtm.setMonth(dtmMonth + 1));
      var daysInMonth = _this.getDaysInMonth(monthNum, year);
      var daysPrevMonth = _this.getDaysInMonth(
        prevM.getMonth(),
        prevM.getFullYear()
      );
      var daysNextMonth = _this.getDaysInMonth(
        nextM.getMonth(),
        nextM.getFullYear()
      );
      var $monthNode = document.createElement("div");
      var $titleNode = document.createElement("h4");
      var skipLength = daysInMonth[0].getDay();
      var preLength = daysInMonth.length + skipLength;
      // console.log($monthNode, monthNames[monthNum], daysInMonth)
      var postLength = function () {
        if (preLength % 7 === 0) {
          return 0;
        } else {
          if (preLength < 35) {
            return 35 - preLength;
          } else {
            return 42 - preLength;
          }
        }
      };
      $monthNode.classList.add("month");

      if (opts.showMonth) {
        $titleNode.innerText =
          monthNames[monthNum] + (opts.showYear ? " " + year : "");
          var newTitle = monthNames[monthNum].substring(0, 3).toLocaleLowerCase()
          // console.log(monthNames[monthNum].substring(0, 3).toLocaleLowerCase())
        $monthNode.appendChild($titleNode);
      }


      if (opts.showDaysOfWeek) {
        dayNames.forEach(function (a, b) {
          var $dayNode = document.createElement("div");
          $dayNode.classList.add("dow");
          $dayNode.innerText = dayNames[b];
          $monthNode.appendChild($dayNode);

        });
      }

      for (var i = 0; i < skipLength; i++) {
        var $dayNode = document.createElement("div");
        // console.log($dayNode) DUMMY DAY!!!!!!!!!!!!!!!!!
        $dayNode.classList.add("dummy-day");
        $dayNode.innerText = daysPrevMonth.length - (skipLength - (i + 1));
        $monthNode.appendChild($dayNode);

      }


      const date = new Date();
      let dayofCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        
      for (var i = 1; i<dayofCurrentMonth.getDate(); i++){
        var $dayNode = document.createElement("div");
        $dayNode.classList.add("day");
          if(dataJson[newTitle][i]){
            $($dayNode).css("background-color", "blue");
            $dayNode.innerText = i
      
          } else {
            $($dayNode).css("background-color", "cyan");
            $dayNode.innerText = i
          };
        $monthNode.appendChild($dayNode)
      };


          
      for (var j = 0; j < postLength(); j++) {
        var $dayNode = document.createElement("div");
        $dayNode.classList.add("dummy-day");
        $dayNode.innerText = j + 1;
        $monthNode.appendChild($dayNode); 
      }

      return $monthNode;
    }
  };
}