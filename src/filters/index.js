import Vue from "vue";

Vue.filter('readableDate', function(event) {

    if (!event) return '';

    if (!event.startDate) {
        return '';
    }

    if (!event.endDate) {
        event.endDate = event.startDate;
    }

    ////////////////////////////////////////

    var startDate;
    var endDate;

    /**
    ////////////////////////////////////////

    if (Fluro.timezoneOffset) {
        startDate = DateTools.localDate(event.startDate);
    } else {
        startDate = new Date(event.startDate);
    }

    ////////////////////////////////////////

    if (Fluro.timezoneOffset) {
        endDate = DateTools.localDate(event.endDate);
    } else {
        endDate = new Date(event.endDate);
    }


    ////////////////////////////////////////

    var now = new Date();

    ///////////////////////////////////////////////

    var noEndDate = startDate.format('g:ia j M Y') == endDate.format('g:ia j M Y');
    var sameYear = (startDate.format('Y') == endDate.format('Y'));
    var sameMonth = (startDate.format('M Y') == endDate.format('M Y'));
    var sameDay = (startDate.format('j M Y') == endDate.format('j M Y'));

    switch (style) {
        case 'short':
            // console.log('SHORT', startDate, endDate);
            if (noEndDate) {
                return startDate.format('j M')
            }

            if (sameDay) {
                //8am - 9am Thursday 21 May 2016
                return startDate.format('j M')
            }

            if (sameMonth) {
                //20 - 21 May 2016
                return startDate.format('j') + '-' + endDate.format('j M')
            }

            if (sameYear) {
                //20 Aug - 21 Sep 2016
                return startDate.format('j') + '-' + endDate.format('j M')
            }

            //20 Aug 2015 - 21 Sep 2016
            return startDate.format('j M Y') + ' - ' + endDate.format('j M Y')

            break;
        default:
            if (noEndDate) {
                return startDate.format('g:ia l j M Y')
            }

            if (sameDay) {
                //8am - 9am Thursday 21 May 2016
                return startDate.format('g:ia') + ' - ' + endDate.format('g:ia l j M Y')
            }

            if (sameMonth) {
                //20 - 21 May 2016
                return startDate.format('j') + '-' + endDate.format('j M Y')
            }

            if (sameYear) {
                //20 Aug - 21 Sep 2016
                return startDate.format('j M') + ' - ' + endDate.format('j M Y')
            }

            //20 Aug 2015 - 21 Sep 2016
            return startDate.format('j M Y') + ' - ' + endDate.format('j M Y')

            break;
    }
    /**/

});



// app.filter('readableTime', function() {
//     return function(event) {

//         var startDate = new Date(event.startDate);
//         var endDate = new Date(event.endDate);

//         var startTime = startDate.format('g:ia')
//         var endTime = endDate.format('g:ia')

//         if (startTime == endTime) {
//             return startTime;
//         } else {
//             return startTime + ' - ' + endTime;
//         }
//     };
// });