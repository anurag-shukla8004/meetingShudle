import { format, parseISO } from 'date-fns';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import { useForm } from 'react-hook-form';
import { AiFillClockCircle } from 'react-icons/ai';
import { FaGlobeAfrica } from 'react-icons/fa';
import { SlCalender } from 'react-icons/sl';
import TimePicker from 'react-time-picker';

function Shedule() {
  const [valueDate, onChangeDate] = useState();
  const [valueTime, onChangeTime] = useState();
  const [togel, setTogel] = useState(true);
  const [successTogel, setSuccessTogel] = useState(true);
  const { register, handleSubmit, reset } = useForm();
  const [items, setItems] = useState([]);
  const [meetBtnTogel, setMeetBtnTogel] = useState(true);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('meeting'));
    if (items) {
      setItems(items);
    }
  }, []);

  const onSubmit = (data) => {
    const value = data;
    value.time = valueTime;
    value.date = valueDate;

    if (
      value.Name === '' ||
      value.Email === '' ||
      value.time === null ||
      value.date === null ||
      value.meetingInfo === ''
    ) {
      setTogel(false);
    } else {
      var meeting = JSON.parse(localStorage.getItem('meeting') || '[]');
      meeting.push(value);
      meeting = [...meeting].reverse();
      localStorage.setItem('meeting', JSON.stringify(meeting));
      setSuccessTogel(false);
      setTimeout(() => setSuccessTogel(true), 2000);
      onChangeDate();
      onChangeTime();
      reset();
      const items = JSON.parse(localStorage.getItem('meeting'));
      if (items) {
        setItems(items);
      }
    }
  };
  const meetBtn = () => {
    setMeetBtnTogel(false);
  };
  const meetBtn2 = () => {
    setMeetBtnTogel(true);
  };

  return (
    <div className="shedule_Main_Container">
      <div className="sheduleBox">
        <div id="confirm" style={{ display: !togel ? 'flex' : 'none' }}>
          <div className="message">If input field are empty</div>
          <div className="message">
            Fill are filed [Name, Email, Time, Date]
          </div>
          <br />
          <button onClick={() => setTogel(true)} className="yes">
            OK
          </button>
        </div>
        <div
          id="confirmSuccess"
          style={{ display: !successTogel ? 'block' : 'none' }}
        >
          <div className="messagesuccess">Meeting Scheduled Successfully</div>
          <br />
        </div>

        <div
          style={{ display: !meetBtnTogel ? 'block' : 'none' }}
          className="flex-box boxsize1"
        >
          <div className="header">
            <button className="meetBtn" onClick={meetBtn2}>
              Add Meeting
            </button>
            <h1>MEETING LIST</h1>
          </div>
          <div className="MeetingInfoMainContainer">
            {items?.map((value, index) => (
              <div className="Meeting_info_box" key={index}>
                <h3>{value?.Name}</h3>
                <h6>{value?.Email}</h6>
                <div className="flex_body">
                  <AiFillClockCircle />
                  <h2>{value?.time} meeing Timing</h2>
                </div>
                <div className="flex_body">
                  <SlCalender />
                  <time>{format(parseISO(value?.date), 'LLLL	d, yyyy')}</time>
                </div>
                <div className="flex_body">
                  <FaGlobeAfrica />
                  <p>Indian Standerd Time</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="flex-box boxsize2"
          style={{ display: !meetBtnTogel ? 'none' : 'block' }}
        >
          <div className="header">
            <button className="meetBtn" onClick={meetBtn}>
              Meeting List
            </button>
            <h1>NEW MEETING SHEDULE</h1>
          </div>
          <div className="form_main_cotainer">
            <div className="form_box">
              <form onSubmit={handleSubmit(onSubmit)}>
                <label>Name</label>
                <input type="text" {...register('Name')} placeholder="Name" />
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  {...register('Email')}
                />
                <label>Date</label>
                <DatePicker onChange={onChangeDate} value={valueDate} />
                <label>Time</label>
                <TimePicker onChange={onChangeTime} value={valueTime} />
                <label>
                  Please share anything that will help for our meeting
                </label>
                <textarea
                  type="text"
                  placeholder="Meeting Info"
                  {...register('meetingInfo')}
                />
                <input className="submitBtn" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="shedule">
        <div id="confirm" style={{ display: !togel ? 'flex' : 'none' }}>
          <div className="message">If input field are empty</div>
          <div className="message">
            Fill are filed [Name, Email, Time, Date]
          </div>
          <br />
          <button onClick={() => setTogel(true)} className="yes">
            OK
          </button>
        </div>
        <div
          id="confirmSuccess"
          style={{ display: !successTogel ? 'block' : 'none' }}
        >
          <div className="messagesuccess">Meeting Scheduled Successfully</div>
          <br />
        </div>

        <div className="flex-box boxsize1">
          <div className="header">
            <button className="meetBtn" onClick={meetBtn2}>
              Add Meeting
            </button>
            <h1>MEETING LIST</h1>
          </div>
          <div className="MeetingInfoMainContainer">
            {items?.map((value, index) => (
              <div className="Meeting_info_box" key={index}>
                <h3>{value?.Name}</h3>
                <h6>{value?.Email}</h6>
                <div className="flex_body">
                  <AiFillClockCircle />
                  <h2>{value?.time} meeing Timing</h2>
                </div>
                <div className="flex_body">
                  <SlCalender />
                  <time>{format(parseISO(value?.date), 'LLLL	d, yyyy')}</time>
                </div>
                <div className="flex_body">
                  <FaGlobeAfrica />
                  <p>Indian Standerd Time</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-box boxsize2">
          <div className="header">
            <button className="meetBtn" onClick={meetBtn}>
              Meeting List
            </button>
            <h1>NEW MEETING SHEDULE</h1>
          </div>
          <div className="form_main_cotainer">
            <div className="form_box">
              <form onSubmit={handleSubmit(onSubmit)}>
                <label>Name</label>
                <input type="text" {...register('Name')} placeholder="Name" />
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  {...register('Email')}
                />
                <label>Date</label>
                <DatePicker onChange={onChangeDate} value={valueDate} />
                <label>Time</label>
                <TimePicker onChange={onChangeTime} value={valueTime} />
                <label>
                  Please share anything that will help for our meeting
                </label>
                <textarea
                  type="text"
                  placeholder="Meeting Info"
                  {...register('meetingInfo')}
                />
                <input className="submitBtn" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shedule;
