import User from "../../../models/user";
import { connectToDB } from "../../../../utils/database";
import Service from "../../../models/services";
import CoFounder from "../../../models/coFounder";
import Entrepreneur from "../../../models/entrepreneurs";
import Investor from "../../../models/investors";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    // console.log(params);
    const fullUser = await User.find({ email: params.id });
    if (!fullUser) {
      return new Response("User not found", { status: 404 });
    }

    // console.log(fullUser);
    let userDetails = {
      user: fullUser,
      roles: {},
    };
    console.log(fullUser[0].roles[0])
    // Fetch data for each role
    if (fullUser[0].roles[0].includes("Investor")) {
      userDetails.roles.Investor = await Investor.findOne({ user: fullUser[0]._id });
    }
    if (fullUser[0].roles[0].includes("Providers services")) {
        console.log("here")
      const test =  userDetails.roles[0].Service = await Service.findOne({ user: fullUser[0]._id });
      console.log(test + "")
    }
    if (fullUser[0].roles[0].includes("CoFounder")) {
      userDetails.roles.CoFounder = await CoFounder.findOne({ user: fullUser[0]._id });
    }
    if (fullUser[0].roles[0].includes("Entrepreneur")) {
      userDetails.roles.Entrepreneur = await Entrepreneur.findOne({
        user: fullUser[0]._id,
      });
    }

    console.log(userDetails);

    return new Response(JSON.stringify(fullUser), { status: 200 });
  } catch (error) {
    return new Response("feild to bring the user from DB", { status: 500 });
  }
};
