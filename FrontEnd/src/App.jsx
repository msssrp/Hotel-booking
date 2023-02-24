import {Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Test from './components/Test'
import AdminDashBoard from './admin/AdminDashBoard'
import Booking from './components/Booking'
import CheckUser from './components/CheckUser'
import UserEdit from './admin/components/UserEdit'
import Room from './admin/components/Room'
import Createroom from './admin/components/Createroom'
import EditRoom from './admin/components/EditRoom'
import EditUser from './admin/components/EditUser'
import CreateUser from './admin/components/CreateUser'
import Bookedroom from './admin/components/Bookedroom'
import BookedroomEdit from './admin/components/BookedroomEdit'
import AdminManage from './admin/components/AdminManage'
import AdminEdit from './admin/components/AdminEdit'
import AdminCreate from './admin/components/AdminCreate'
import AdminChangePassword from './admin/components/AdminChangePassword'
import Bookroom from './components/Bookroom'
import Payment from './components/Payment'
import Mybook from './components/Mybook'
import UserUpdate from './components/UserUpdate'
import AboutUs from './components/AboutUs'
import Privacy from './components/Privacy'
import Contact from './components/contact'
function App() {
  

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about-us' element={<AboutUs/>}></Route>
        <Route path='/privacy' element={<Privacy/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/sign-in' element={<Login/>}></Route>
        <Route path='/sign-up' element={<Register/>}></Route>
        <Route path='/check-user' element={<CheckUser/>}></Route>
        <Route path='/dashboard' element={<AdminDashBoard/>}></Route>
        <Route path='/booking' element={<Booking/>}></Route>
        <Route path='/book-room/:id' element={<Bookroom/>}></Route>
        <Route path='/book-room/payment/:id' element={<Payment/>}></Route>
        <Route path='/my-book' element={<Mybook/>}></Route>
        <Route path='/user' element={<UserUpdate/>}></Route>
        <Route path='/dashboard/user' element={<UserEdit/>}></Route>
        <Route path='/dashboard/user/create-user' element={<CreateUser/>}></Route>
        <Route path='/dashboard/user/user-edit/:id' element={<EditUser/>}></Route>
        <Route path='/dashboard/room' element={<Room/>}></Route>
        <Route path='/dashboard/room/create-room' element={<Createroom/>}></Route>
        <Route path='/dashboard/room/room-edit/:id' element={<EditRoom/>}></Route>
        <Route path='/dashboard/booking-room' element={<Bookedroom/>}></Route>
        <Route path='/dashboard/booking-room/edit/:id' element={<BookedroomEdit/>}></Route>
        <Route path='/dashboard/admin-manage' element={<AdminManage/>}></Route>
        <Route path='/dashboard/admin-manage/create' element={<AdminCreate/>}></Route>
        <Route path='/dashboard/admin-manage/edit/:id' element={<AdminEdit/>}></Route>
        <Route path='/dashboard/admin-manage/change-password/:id' element={<AdminChangePassword/>}></Route>
      </Routes>
    </div>
  )
}

export default App
