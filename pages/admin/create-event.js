import { useState } from "react";
import EventInfo from "../../component/admin/EventInfo";
import OrganizerInfo from "../../component/admin/OrganizerInfo";
import SiteHeader from "../../component/layout/SiteHeader/SiteHeader";
import EventService from "../../services/EventService";
import moment from "moment";
import Cookies from "universal-cookie";


// export async function getServerSideProps(context) {
//   console.log('from server:-' , context.req.headers.cookie)
//   try {
//     if (context.req.headers.cookie) {
//       const contextCookie = getCookieValue(
//         context.req.headers.cookie,
//         "userNullcast"
//       );
//       if (contextCookie) {
//         const cookie = JSON.parse(contextCookie)
//         return {
//           props : {

//           }
//       }
//     } else {
//       return {
//         props : {
            
//         }
//         }
//       };
//     }
//   } catch (err) {
//     //notify(err?.response?.data?.message ?? err?.message, 'error');
//     return {
//       props : {
            
//       }
//   }
//}}


const CreateEvent = () => {
  const cookies = new Cookies();
  const userCookie = cookies.get("userNullcast");
  console.log('cookies' , userCookie)
  const [eventDetails, setEventDetails] = useState({
    organizerImage: "",
    organizerName: "",
    tagLine: "",
    eventName: "",
    eventLocation: "",
    eventDescription: "",
    eventLink: "",
    eventDate: "",
    eventTime: "",
    eventImage: ""
  });

  const formatTime = () => {
    let isoDate = moment(
      `${eventDetails.eventDate} ${eventDetails.eventTime}`
    ).format();
    console.log(isoDate);
    return isoDate;
  };

  const createEventHandler = async (e) => {
    //e.preventDefault();
    try {
      const data = await EventService.createNewEvent(userCookie , {
        guest_name: eventDetails.organizerName,         
        guest_designation: eventDetails.tagLine,
        guest_image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/1200px-Nextjs-logo.svg.png",
        title: eventDetails.eventName,
        registration_link: eventDetails.eventLink,
        banner_image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/1200px-Nextjs-logo.svg.png",
        description: eventDetails.description,
        event_time: formatTime()
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    formatTime();
  };

  return (
    <div className="bg-gray-100 min-h-full pb-5">
      <SiteHeader />
      <div className="bg-white max-w-6xl mx-auto flex  mt-3.5">
        <div className="px-4">
          <p className="font-bold text-sm rounded py-4">Create Event</p>
          <div className="h-1 bg-black rounded-t"></div>
        </div>
      </div>
      <div className="bg-white max-w-4xl m-auto mt-5 rounded border ">
        <div>
          <h1 className="font-bold text-xl mx-10 pt-8 pb-5">
            Create New Event
          </h1>
        </div>
        <OrganizerInfo
          eventDetails={eventDetails}
          setEventDetails={setEventDetails}
        />
        <EventInfo
          eventDetails={eventDetails}
          setEventDetails={setEventDetails}
        />
        <div className="flex items-center justify-end mx-10 mb-6">
          <button className="border-2 border-black bg-white px-8 py-2 rounded mr-5">
            Cancel
          </button>
          <button
            className="border-2 border-black bg-black px-8 py-2 rounded text-white"
            onClick={(e) => createEventHandler(e)}
            type="button"
          >
            Donate
          </button>
        </div>
      </div>
    </div>
  );
};


export default CreateEvent;
