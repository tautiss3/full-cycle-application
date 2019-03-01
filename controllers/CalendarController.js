const Workoutevent = require('../models/Workoutevent');

var calController = {};


calController.calendarHome = (req, res, next) => {
	res.render("calendar/calendar");
}


calController.loadEvents = (req, res) => {
    // console.log("veikia>>>>>>>>>>>>>>>>>>>>");
	Workoutevent.find({}, (err, data) => {
        console.log(data)
		//set id property for all records
		for (var i = 0; i < data.length; i++)
			data[i].id = data[i]._id;		
		//output response
		res.send(data);
	});
};

calController.doEvent = function(req, res){
    console.log(req.body);
	var data = req.body;
	var mode = data["!nativeeditor_status"];
	var sid = data.id;
	var tid = sid;

	delete data.id;
	delete data.gr_id;
	delete data["!nativeeditor_status"];


	function update_response(err, result){
		if (err) {
			mode = "error";
        } else if (mode == "inserted") {
			tid = data._id;
        }    
		res.setHeader("Content-Type","application/json");
		res.send({action: mode, sid: sid, tid: tid});
	}

	if (mode == "updated") {
        // console.log("updatinam>>>>>>>>>>>>>>>");
    Workoutevent.findById(sid, (err, eventFromDB)=>{
        eventFromDB.text = data.text;
        eventFromDB.start_date = data.start_date;
        eventFromDB.end_date = data.end_date;
        eventFromDB.event_pid = data.event_pid;
        eventFromDB.event_length = data.event_length;
        eventFromDB.rec_type = data.rec_type;
        
        eventFromDB.save(function(err, post) {
        if (err) throw err;
            res.redirect('/calendar');
        });  
    })
    } else if (mode == "inserted") {
        // console.log(" iki cia daejo >>>>>>");
		let newEvent = new Workoutevent({
            start_date: data.start_date,
            end_date: data.end_date,
            text: data.text,
            event_pid: data.event_pid,
            event_length: data.event_length,
            rec_type: data.rec_type
        });
        newEvent.save();
    } else if (mode == "deleted") {
        // console.log('trinam>>>>>>>>>>>')
		Workoutevent.findOneAndDelete({ "_id": sid  }, (error, data)=>{
            if(error){
                console.log("error in deleting!");
                throw error;
            } else {
                console.log("data all gone and deleted");
                res.status(204);
            }
        });
    } else {
        res.send("Not supported operation");
    }    
    // res.redirect('/calendar');
}

module.exports = calController;