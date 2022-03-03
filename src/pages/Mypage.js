import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Grid from '../elements/Grid';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import 'moment/locale/ko';
import { Calendar } from '@fullcalendar/core';
import momentPlugin from '@fullcalendar/moment'
import { toMoment, toMomentDuration } from '@fullcalendar/moment';
import React from 'react';


const events = [
  {
    id: 1,
    title: 'event 1',
    start: '2022-03-17T13:00:00',
    end: '2022-03-20T13:00:00',
  },
  {
    id: 2,
    title: 'event 2',
    start: '2022-03-16T13:00:00',
    end: '2022-03-16T18:00:00',
  },
  { id: 3, title: 'event 3', start: '2022-03-17T13:00:00', end: '2022-03-20T13:00:00' },
  {
    id: 4,
    title: 'event 4',
    start: '2022-03-16T13:00:00',
    end: '2022-03-16T18:00:00',
  },
  {
    id: 5,
    title: 'event 5',
    start: '2022-03-16T13:00:00',
    end: '2022-03-16T18:00:00',
  },
  {
    id: 6,
    title: 'event 6',
    start: '2022-03-16T13:00:00',
    end: '2022-03-16T18:00:00',
  },
  {
    id: 7,
    title: 'event 7',
    start: '2022-03-16T13:00:00',
    end: '2022-03-16T18:00:00',
  },
  {
    id: 8,
    title: 'event 8',
    start: '2022-03-16T13:00:00',
    end: '2022-03-16T18:00:00',
  },
];

function FullCalendarApp(props) {
    const dateClickHandler = (e) => {
        console.log(e)
    
        const date = events.filter((item) => item.start.includes(e.dateStr))
        console.log(date)
        const title = []
        const startTime = [];  //time.push(item.split("T")[1])
        const endTime = []
        const totalData = {}
        date.map((item, index) => {
            title.push(item.title)
            startTime.push(item.start.split("T")[1])
            endTime.push(item.end.split("T")[1])
        })
        console.log(title,startTime, endTime)

    }
  return (
    <>
    <Grid margin="auto" width="900px">
      <FullCalendar
      height= '900px'
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dayMaxEvents= {true} //일정 많아지면 +버튼 생성
        // dayMaxEventRows="3"
        headerToolbar={{
            right: 'prev,next today',
            center: 'title',
          left: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        
        // customButtons={{
        //   new: {
        //     text: 'new',
        //     onclick: () => console.log('new event'),
        //   },
        // }}

        events={events}
        // editable="true" //드래그로 일정 변경 가능
        // events= 'https://fullcalendar.io/api/demo-feeds/events.json?overload-day'

        // nowIndicator
        dateClick={dateClickHandler}
        eventClick={(e) => console.log(e.event.title)}
        locale="ko" //한국어변경
      />
    </Grid>
      {/* <Grid>

      <div>
        <label for="todo">할일</label><br></br>
        <input required id="todo" type="text" placeholder="오늘의 목표는?" />
      </div>

      <div>
          <label>시작일</label>
          <Datetime locale="ko"/>
        </div>

        <div>
          <label>종료일</label>
          <Datetime locale="ko"/>
        </div>

        <button>추가하기</button>


        </Grid> */}
    </>
  );
}

export default FullCalendarApp;