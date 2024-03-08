// To use previous step data, pass the `steps` object to the run() function
export default defineComponent({
    async run({ steps, $ }) {
        var sources = [];
        for(const event of steps.coinmarketcal_search_events.$return_value) {
            var dateToday = new Date().toDateString();
            var dateEvent = new Date(event.date_event).toDateString();
            if(dateToday >= dateEvent && dateToday <= dateEvent){
                sources.push("- " + event.source);
            }
        }
        if(sources.length != 0){
            $.export('sources', "Evénements prévus aujourd'hui :\n" + sources.join("\n"));
        } else {
            $.export('sources', "Evénements prévus aujourd'hui : Aucun événement prévu")
        }
    },
})