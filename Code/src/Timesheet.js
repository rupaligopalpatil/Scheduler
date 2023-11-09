import React, { useEffect, useState } from 'react';
import { DayPilot, DayPilotScheduler } from "daypilot-pro-react";

const Timesheet = () => {

  const schedulerRef = React.createRef();
  const getScheduler = () => schedulerRef.current.control;

  // const [showBusinessOnly, setShowBusinessOnly] = useState(false);
  // const [showDailyTotals, setShowDailyTotals] = useState(false);

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
      //args.data.barColor = projects.color;
      args.data.backColor = '#0b70d1';
      args.data.areas = [
        {
          top: 7,
          left: 5,
          text: duration.toString("h:mm"),
          fontColor: "#ffffff"
        },
       /*  {
          top: 5,
          left: 5,
          text: args.data.text,
        },
        {
          top: 20,
          left: 5,
          text: projects.name,
          fontColor: "#ffffff"
        } */
      ];
     /*  args.data.html = <div>{projects.name}
      <p>{ args.data.text }</p>
      </div> */

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
      /* const form = [
        {name: "Text", id: "text"},
        {name: "Start", id: "start", type: "datetime"},
        {name: "End", id: "end", type: "datetime", onValidate: (args) => {
            if (args.values.end.getTime() < args.values.start.getTime()) {
              args.valid = false;
              args.message = "End must be after start";
            }
          }
        },
        {name: "Project", id: "project"}
      ];
      const data = {
        start: args.start,
        end: args.end,
        project: projects[0].id,
        text: "New task"
      }; */
     /*  const modal = await DayPilot.Modal.form(form, data);
      if (modal.canceled) { return; } */
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

  // useEffect(() => {
  //   const events = [
  //     /* {
  //       id: 1,
  //       text: "Task 1",
  //       start: "2023-05-02T10:00:00",
  //       end: "2023-05-02T11:00:00",
  //       project: 1,
  //     },
  //     {
  //       id: 2,
  //       text: "Task 2",
  //       start: "2023-05-05T09:30:00",
  //       end: "2023-05-05T11:30:00",
  //       project: 2,
  //     },
  //     {
  //       id: 3,
  //       text: "Task 3",
  //       start: "2023-05-07T10:30:00",
  //       end: "2023-05-07T13:30:00",
  //       project: 3,
  //     } */
  //   ];
    
  //   // getScheduler().update({
  //   //   /* events,
  //   //   scrollTo: DayPilot.Date.today().firstDayOfMonth().addHours(9) */
  //   // });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const changeBusiness = (e) => {
  //   setShowBusinessOnly(e.target.checked);
  //   setConfig(prevConfig => ({
  //     ...prevConfig,
  //     showNonBusiness: !e.target.checked
  //   }));
  // }

  // const changeSummary = (e) => {
  //  // setShowDailyTotals(e.target.checked);

  //   if (e.target.checked) {
  //     setConfig(prevConfig => ({
  //       ...prevConfig,
  //       rowHeaderColumns: [
  //         {name: "Day", width: 40},
  //       ]
  //     }));
  //   }
  //   else {
  //     setConfig(prevConfig => ({
  //       ...prevConfig,
  //       rowHeaderColumns: [
  //         {name: "Day", width: 40}
  //       ]
  //     }));
  //   }
  // }

  return (
    <div>
      {/*    <div className={"space"}>
        <label><input type={"checkbox"} onChange={changeBusiness} checked={showBusinessOnly} /> Show only business hours</label>
        <label><input type={"checkbox"} onChange={changeSummary} checked={showDailyTotals} /> Show daily totals</label>
      </div> */}
      <DayPilotScheduler
        {...config}
        ref={schedulerRef}
      />
    </div>
  );
}

export default Timesheet;
