var meetup = meetup || {};

meetup.config = {
  group_url: 'code-for-seoul',
  group_id: '146177402',
  api: '7e603761f462d75487f3e3021584a73'
}

meetup.getEvents = function(options) {
  var status = options && options.status || 'upcoming',
      desc = options && options.desc || false;

  var url = 'https://api.meetup.com/2/events?&key=' + meetup.config.api + '&sign=true&photo-host=public&desc=' + desc + '&group_urlname='+ meetup.config.group_url + '&page=10&status=' + status;

  $.ajax({
    type: 'GET',
    url: url,
    async: false,
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(data) {
      var events = [];

      $.each(data.results, function (key, val) {
        var date = new Date(val.time);
        convertedDate = (date.getMonth()+1) + '월 ' + date.getDate() + '일 ' + date.getHours() + ':' + date.getMinutes();
        events.push("<div class='event'><h4 class='event_name'><a href='" + val.event_url + "' target='_blank'>" + val.name + "</a></h4><p><b>" + convertedDate + "</b></p>" + val.description.substring(0, 100) + "...</div>");
      });
      
      $('.events').html(events.join(""));
    }
  });
};

meetup.getEvents();