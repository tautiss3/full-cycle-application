var init = () => {
  scheduler.config.first_hour = 7;
  scheduler.config.event_duration = 60;
  scheduler.config.auto_end_date = true;
  scheduler.config.full_day = true;
  scheduler.config.separate_short_events = true;
  scheduler.config.xml_date = "%Y-%m-%d %H:%i";
  scheduler.config.time_step = 15;
  scheduler.config.details_on_create = true;

  scheduler.locale.labels.section_type = "Select Workout";
  scheduler.config.lightbox.sections = [
    {
      name: "description",
      height: 50,
      map_to: "text",
      type: "textarea",
      focus: true
    },

    {
      name: "type",
      height: 21,
      map_to: "type",
      type: "select",
      options: [
        { key: "Chest", label: "Chest" },
        { key: "Legs", label: "Legs" },
        { key: "Back", label: "Back" },
        { key: "Biceps", label: "Biceps" },
        { key: "Shoulders", label: "Shoulders" },
        { key: "Triceps", label: "Triceps" }
      ],
      onchange: function() {
        console.log(this.value);
        scheduler.formSection("description").setValue(this.value);
      }
    },
    {
      name: "recurring",
      height: 115,
      type: "recurring",
      map_to: "rec_type",
      button: "recurring"
    },
    { name: "time", height: 72, type: "time", map_to: "auto" }
  ];

  if (
    (window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth) < 700
  ) {
    scheduler.init("scheduler_here", new Date(), "agenda");
  } else {
    scheduler.init("scheduler_here", new Date(), "month");
  }
  scheduler.locale.labels.agenda_tab = "My Agenda";
  scheduler.config.agenda_start = new Date();

  scheduler.templates.xml_date = function(value) {
    return new Date(value);
  };
  scheduler.load("/calendar/data", "json");

  var dp = new dataProcessor("/calendar/data");
  dp.init(scheduler);
  dp.setTransactionMode("POST", false);
};
