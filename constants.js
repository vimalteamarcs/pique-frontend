

const ALL_VENUE = "admin/venue/all";
const UPDATE_VENUE="admin/venue/update";
const DELETE_VENUE="admin/venue/";
const CREATE_VENUE="admin/venue/create";
const SEARCH_EVENT="admin/venue/search?query="

const ALL_ENTERTAINERS= "admin/entertainer/all";
const CREATE_ENTERTAINER="admin/entertainer/createent";
const CHANGE_STATUS_ENT="admin/entertainer/updatestatusent"
const GET_MAIN_CATEGORY="admin/entertainer/maincategory";
const GET_SUB_CATEGORY="admin/entertainer/subcategory";
const GET_CATEGORY_BYID="admin/entertainer/categorybyId?id=";
const CREATE_CATEGORY="admin/entertainer/createcat";
const DELETE_CATEGORY="admin/entertainer/deletecat";
const UPDATE_CATEGORY="admin/entertainer/updatecat";
const GET_ENTERTAINERS_BYID="admin/entertainer/entertainerbyId/"
const UPDATE_ENTERTAINERS_BYID="admin/entertainer/update";


const UPDATE_MEDIA="admin/media/update/"


const ALL_USER="admin/users/all";
const UPDATE_USER_STATUS="admin/users/updateuserstatus";
const UPDATE_USER="admin/users/updateuser";
const CREATE_USER="admin/users/create";
const GET_VENUE_BY_USER="admin/venue/venuebyId/";

const ADMIN_LOGIN="admin/auth/login";
const CREATE_ADMIN_USER="admin/auth/createadminuser";

const CREATE_ROLE="admin/adminuser/createrole";
const GET_CAPABILITIES="admin/adminuser/capabilities";
const GET_ROLES="admin/adminuser/roles";



const GET_COUNTRIES="admin/location/countries";
const GET_STATES="admin/location/states?countryId="
const GET_CITIES="admin/location/cities?stateId="
const SEARCH_COUNTRIES="admin/location/countries/Search?search="
const CHANGE_ISALLOWED="admin/location/allow/"
const GETALLISALLOWED="admin/location/allowed-countries"



const UPLOAD_MEDIA="admin/media/uploads";
const GET_MEDIA_BYID="admin/media/getmedia?Id=";
const DELETE_MEDIA="admin/media/deleteMedia?Id=";
const UPLOAD_URL_BY_USERID="admin/media/uploadurl";


const CREATE_EVENT="admin/events/create";
const GET_ALL_EVENTS="admin/events/getall?"
const GET_EVENTBY_ID="admin/events/eventbyid/"
const UPDATE_EVENT="admin/events/updatebyid/"
const DELETE_EVENT="admin/events/deletebyid"
const GETBOOKING_BYEVENT_ID='admin/events/BookingsByEventId/'


const GET_ALL_INVOICES="admin/invoice/getallinvoice"
const DELETE_INVOICE="admin/invoice/deleteinvoice"


const GET_REPORT="admin/report/all"
const CURRENCY_SIGN="$"
export {
  CURRENCY_SIGN,
  GET_REPORT,
  DELETE_INVOICE,
  GET_ALL_INVOICES,
  GETALLISALLOWED,
  CHANGE_ISALLOWED,
  SEARCH_COUNTRIES,
  GETBOOKING_BYEVENT_ID,
  DELETE_EVENT,
  UPDATE_EVENT,
  GET_EVENTBY_ID,
  SEARCH_EVENT,
  GET_ALL_EVENTS,
  CREATE_EVENT,
  UPLOAD_URL_BY_USERID,
  DELETE_MEDIA,
  UPDATE_MEDIA,
  UPDATE_ENTERTAINERS_BYID,
  GET_CATEGORY_BYID,
  GET_MEDIA_BYID,
  UPLOAD_MEDIA,
  CREATE_ENTERTAINER,
  CHANGE_STATUS_ENT,
  GET_VENUE_BY_USER,
  GET_COUNTRIES,
  GET_STATES,
  GET_CITIES,
  CREATE_USER,
  UPDATE_USER,
  UPDATE_USER_STATUS,
  ALL_VENUE,
  UPDATE_VENUE,
  DELETE_VENUE,
  GET_MAIN_CATEGORY,
  GET_SUB_CATEGORY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  ALL_ENTERTAINERS,
  ALL_USER,
  ADMIN_LOGIN,
  CREATE_ROLE,
  CREATE_ADMIN_USER,
  GET_CAPABILITIES,
  GET_ROLES,
  CREATE_VENUE,
  GET_ENTERTAINERS_BYID
};
