// To use previous step data, pass the `steps` object to the run() function
export default defineComponent({
    async run({ steps, $ }) {
      var sources = [];
      for(const event of steps.coinmarketcal_search_events.$return_value) {
        var dateTomorrow = new Date();
        dateTomorrow.setDate(dateTomorrow.getDate() + 1)
        dateTomorrow = dateTomorrow.toDateString()
        var dateEvent = new Date(event.date_event).toDateString();
        console.log(dateTomorrow);
        console.log(dateEvent)
        if(dateTomorrow >= dateEvent && dateTomorrow <= dateEvent){
          sources.push("- " + event.source);
        }
      }
      if(sources.length != 0){
        $.export('sources', "Evénements prévus demain :\n" + sources.join("\n"));
      } else {
        return $.flow.exit();
      }
    },
  })