import React, { useEffect, useState } from 'react';
import { DayPilot, DayPilotScheduler } from "daypilot-pro-react";

const Timesheet = () => {

  const schedulerRef = React.createRef();
  const getScheduler = () => schedulerRef.current.control;
  const projects = [
    {id: 1, name: "Project A", color: "#38761d"},
    {id: 2, name: "Project B", color: "#0d8ecf"},
    {id: 3, name: "Project C", color: "#f1c232"},
  ];

  const [config, setConfig] = useState({
    locale: "en-us",
    rowHeaderColumns: [
      {name: "Day", width: 40}
    ],
    onBeforeRowHeaderRender: (args) => {
      //args.row.columns[0].horizontalAlignment = "center";    
    },
    onBeforeEventRender: (args) => {
      const duration = new DayPilot.Duration(args.data.start, args.data.end);
      args.data.backColor = '#0b70d1';
      args.data.areas = [
        {
          top: 7,
          left: 5,
          text: duration.toString("h:mm"),
          fontColor: "#ffffff"
        },
    },
    cellWidthSpec: "Auto",
    cellWidthMin: 25,
    timeHeaders: [{"groupBy":"Hour"},{"groupBy":"Cell","format":"mm"}],
    scale: "CellDuration",
    cellDuration: 15,
    eventHeight: 30,
    days: DayPilot.Date.today().daysInMonth(),
    viewType: "Days",
    startDate: DayPilot.Date.today().firstDayOfMonth(),
    allowEventOverlap: false,
    timeRangeSelectedHandling: "Enabled",
    rowMinHeight: 45,
    rowMarginTop : 15,
    onTimeRangeSelected: async (args) => {
      const dp = args.control;
      dp.clearSelection();
      dp.events.add({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        resource: args.resource,
        cssClass: "my-event",
        //text: modal.result,
      });
      dp.eventClickHandling = "Select";
      dp.allowMultiSelect = false;
      dp.eventDeleteHandling = "Update";
      dp.eventDoubleClickHandling = "Enabled";
      dp.onEventDoubleClick = function(args) {
        alert("Event with id " + args.e.id() + " was double-clicked");
      };
    },
    onBeforeCellRender: args => {     
        args.cell.backColor = "#ffffff";
    },
    onBeforeGridLineRender: args =>{
      if (args.type === "VerticalLine") {
        args.hidden = true;
      }
    }
    
  });


  return (
    <div>
      <DayPilotScheduler
        {...config}
        ref={schedulerRef}
      />
    </div>
  );
}

export default Timesheet;
