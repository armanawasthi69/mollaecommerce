import axios from "axios";
import { toast } from "react-toastify";

export async function fetchApi(url) {
  try {
    let data = await fetch(url);
    data = await data.json();
    return data;
  } catch (err) {
    console.log(err);
  }

}


export async function PostApi(url, userdata) {
  try {
    let data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        "Accept": "*"
      },
      body: JSON.stringify(userdata)
    });
    data = await data.json();
    return data;
  } catch (err) {
    console.log(err);
  }

}


export async function axiosApi(url) {
  try {
    let response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err);
    toast.error(err.response.data.message);
   }

}