/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import axios from 'axios';

const App = () => {

  const [useData, setUserData] = useState(null);
  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    checkUserData();
  }, []);

  /* https://graph.facebook.com/v20.0/2782765752032037/accounts?access_token=EAATcTIA4YaMBO1ANw93pj8YDXFrdp6rhlySA42CmpJ3Dr5mKUIWQfF0fGENwJS3ZCw7X4ZCjRQK7LFRv1ZCZCZCOoiarMgXI5QgMUvjXTOwd5YtuIK0hOQaw2ZA0sxDQHuZAKngHzgWC2RXZBKhDdw7oZAnM4Ag85MlvQzEGyRZBQFi4XEZBIiYIAEEcZC6p1507pqEiNsRCvafGotncbO0hguHyJRUn4cm2ZA49ZBZBTz9eaZAK5QElgDlxHyxyZAxhWoohZB1gZDZD
  
  https://graph.facebook.com/2782765752032037?metadata=1&access_token=EAATcTIA4YaMBO1ANw93pj8YDXFrdp6rhlySA42CmpJ3Dr5mKUIWQfF0fGENwJS3ZCw7X4ZCjRQK7LFRv1ZCZCZCOoiarMgXI5QgMUvjXTOwd5YtuIK0hOQaw2ZA0sxDQHuZAKngHzgWC2RXZBKhDdw7oZAnM4Ag85MlvQzEGyRZBQFi4XEZBIiYIAEEcZC6p1507pqEiNsRCvafGotncbO0hguHyJRUn4cm2ZA49ZBZBTz9eaZAK5QElgDlxHyxyZAxhWoohZB1gZDZD*/

  const checkUserData = () => {
    let user = localStorage.getItem("userDetails");
    let data = JSON.parse(user);
    if (data?.userID > 0) {
      getPageApiCall(data);
      setUserData(data);
    }
  };

  const getPageApiCall = async (data) => {

    const link = `https://graph.facebook.com/v20.0/${data.userID}/accounts?access_token=${data.accessToken}`

    const response = await axios.get(link);

    setPageData(response.data.data);
  }

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 h-screen">
          {
            (!useData) ?
              <>
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                  <h2 className="text-center font-bold italic leading-tight text-black sm:text-4xl">Sign in</h2>
                  <div className="mt-3 space-y-3">
                    <LoginSocialFacebook appId="1368121033646499" onResolve={(response) => {
                      console.log(response);
                      localStorage.setItem('userDetails', JSON.stringify(response.data));
                      setUserData(response.data);
                    }} onReject={(error) => { console.log(error); }} className="relative inline-flex w-full items-center justify-center rounded-md  font-semibold text-gray-700 transition-all duration-200  hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none">
                      <FacebookLoginButton>
                        Login With Facebook
                      </FacebookLoginButton>
                    </LoginSocialFacebook>
                  </div>
                </div>
              </>
              :
              <>
                <div>
                  <img src={useData.picture.data.url} width={"100px"} className='rounded' /><br />
                  <h6 className='leading-10 text-4xl'>Name: {useData.name}</h6><br />
                  <h5>Email: {useData.email}</h5>
                  <h5>User Id: {useData.userID}</h5>
                  <div className='mt-2'>
                    {
                      pageData.length > 0 && pageData.map((result, index) => {
                        return (
                          <>
                            <div className='bg-white p-3 border rounded-lg shadow-md shadow-slate-400 cursor-pointer'>
                              <h5>Page Id: {result?.id}</h5>
                              <h5>Page Name: {result?.name}</h5>
                              <h5>Page Category: {result?.category}</h5>
                            </div>
                          </>
                        );
                      })
                    }
                  </div>
                </div>
              </>
          }
        </div>
        <div className="h-full w-full">
          <img
            className="mx-auto h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt=""
          />
        </div>
      </div>
    </section>
  )
}

export default App;