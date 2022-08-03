<<<<<<< HEAD
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Billing } from './Billing/Billing'
import { Customer } from './Customers/Customer'
import { Customers } from './Customers/Customers'
import { Dashboard } from './Dashboard'
import {Error} from './Error'
import { MenuBuilder } from './MenuBuilder/MenuBuilder'
import { ProfileSetup } from './ProfileSetup/ProfileSetup'
import { Setting } from './Setting/Setting'
import { Translations } from './Setting/Translations'
import { ToggleFeature } from './ToggleFeature'
export const Routing = () => {
  return (
    <Routes>
    <Route path='/' element={<Dashboard/>}/>
    <Route path='/customers' element={<Customers/>}/>
    <Route path='/customer' element={<Customer/>}/>
    <Route path='/menu-builder' element={<MenuBuilder/>}/>
    <Route path='/profile-setup' element={<ProfileSetup/>}/>
    <Route path='/setting' element={<Setting/>}/>
    <Route path='/translations' element={<Translations/>}/>
    <Route path='/upgrade-plan' element={<Billing/>}/>
    <Route path='/toggle-feature' element={<ToggleFeature/>}/>
    <Route component={Error}/>    
    </Routes>
  )
}
  
=======
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Billing } from "./Billing/Billing";
import { Customer } from "./Customers/Customer";
import { Customers } from "./Customers/Customers";
import { Dashboard } from "./Dashboard";
import { Error } from "./Error";
import { MenuBuilder } from "./MenuBuilder/MenuBuilder";
import { ProfileSetup } from "./ProfileSetup/ProfileSetup";
import { Setting } from "./Setting/Setting";
import { Translations } from "./Setting/Translations";
import { ToggleFeature } from "./ToggleFeature";
export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/customer/:id" element={<Customer />} />
      <Route path="/menu-builder" element={<MenuBuilder />} />
      <Route path="/profile-setup" element={<ProfileSetup />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/translations" element={<Translations />} />
      <Route path="/plan" element={<Billing />} />
      <Route path="/toggle-feature" element={<ToggleFeature />} />
      <Route element={<Error />} />
    </Routes>
  );
};
>>>>>>> d92db7b (make it better)
