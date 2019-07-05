let rawfilters = {
  filters: []
};
$(document).ready(function () {
  $("#submitBtn").click(function () {
    rawfilters.filters.city = ($("#city").val()).replace(/\s/g, '').split(",");
    rawfilters.filters.company = ($("#company").val()).replace(/\s/g, '').split(",");
    console.log(rawfilters);
    getData();
  });
});

const makeRequest = (f) => {
  $.post(url, f)
    .done(function (data) {
      alert("Data Loaded: " + data);
    });
}


let filters = [
  {
    name: "city",
    params: ["Stuttgart", "Berlin", "Moscow"]
  }
];
getData();


function getData() {
  $.getJSON('../data.json', function (data) {
    let newdata = {
      jobs: []
    };

    if (!(filters === undefined || filters.length == 0)) {

      generalFilter = (job) => {
        let q = true;
        filters.map(filter => {
          //console.log("Job: " + job.title);
          //console.log("Filter: " + filter.name);
          //console.log(filter.params.includes(job[filter.name]));
          if ((filter.params.includes(job[filter.name])) === false) {
            q = false;
          }
        });
        if (q) return true;
        return false;
      }

      let initiallength = data.jobs.length;
      for (var i = 0; i < initiallength; i++) {
        console.log("i: " + i + " " + generalFilter(data.jobs[i]));
        if (generalFilter(data.jobs[i])) {
          //console.log("Nice");
          newdata.jobs.push(data.jobs[i]);
        } else {
          console.log("remove item");
          data.jobs[i].available = "false";
        }
      }
    }
    var template = "<h1>Jobs : </h1><ul>{{#jobs}} <li>{{title}}</li> {{/jobs}}</ul>";
    console.log(newdata);
    var html = Mustache.to_html(template, newdata);
    $('#sampleArea').html(html);
  });
}
