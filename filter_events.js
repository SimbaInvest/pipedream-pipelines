// To use previous step data, pass the `steps` object to the run() function
export default defineComponent({
  async run({ steps, $ }) {
    var sources = [];
    for(const event of steps.coinmarketcal_search_events.$return_value) {
      var dateTomorrow = new Date();
      dateTomorrow.setDate(dateTomorrow.getDate() + 1);
      dateTomorrow = dateTomorrow.toDateString();
      var dateEvent = new Date(event.date_event);
      console.log(dateTomorrow);
      console.log(dateEvent)
      var year = dateEvent.toLocaleString("default", { year: "numeric" });
      var month = dateEvent.toLocaleString("default", { month: "2-digit" });
      var day = dateEvent.toLocaleString("default", { day: "2-digit" });

      var dateEventText = year + "/" + month + "/" + day;

      if(dateTomorrow >= dateEvent.toDateString() && dateTomorrow <= dateEvent.toDateString()){
        sources.push(dateEventText + " - " + event.coins[0].symbol + " | [" + event.title.en + "](" + event.source + ")" );
      }
    }
    var sourcesToReturn = sources.slice(0, 15);
    if(sources.length != 0){
      $.export('sources', "📅 **Evénements planifiés demain**\n" + sourcesToReturn.join("\n"));
    } else {
      return $.flow.exit();
    }
  },
})