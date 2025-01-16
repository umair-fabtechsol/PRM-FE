"use client";

import PrivateRoute from "../../components/PrivateRoute";
import Header from "../../components/Header";
import { FaSearch, FaPlus, FaArrowUp, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

export default function CommisionDetailPage() {
  return (
    <PrivateRoute>
      <div className="px-6 py-2 min-h-screen bg-transparent">
        <div className="my-2 flex justify-end">
          <Link href="#">
            <button className="text-gray-700 hover:text-blue-700 mx-2 px-2">
              <img
                src="/icons/edit.png"
                alt="Custom Icon"
                className="w-6 h-6 "
              />
            </button>
          </Link>

          <Link href="#">
            <button className="text-gray-700 hover:text-blue-700 mx-2 px-2">
              <img
                src="/icons/delete.png"
                alt="Custom Icon"
                className="w-6 h-6 "
              />
            </button>
          </Link>
        </div>

        <div className="py-2   my-2">
          <p className="text-black py-2  text-sm">Commission Name</p>
          <p className="text-gray-700 text-xs">Commission Plan 01</p>
        </div>

        <div className="py-2   my-2">
          <p className="text-black py-2  text-sm">Description</p>
          <p className="text-gray-700 text-xs">
            {" "}
            This is a dummy description text. It should be around 50 to 60 words
            in length. You can replace it with your actual data as needed. This
            is a dummy description text. It should be around 50 to 60 words in
            length. You can replace it with your actual data as needed. should
            be around 50 to 60 words in length. You can replace it with your
            actual data as needed.
          </p>
        </div>

        <div className="py-2   my-2">
          <p className="text-black py-2  text-sm">Commission Type</p>
          <p className="text-gray-700 text-xs">Flat</p>
        </div>

        <div className="py-2 my-2 grid grid-cols-3 gap-4">
          <div className="text-left py-2">
            <p className="text-black py-2 text-sm">First Tier Commission</p>
            <p className="text-gray-700 text-xs">20%</p>
          </div>

          <div className="text-left py-2">
            <p className="text-black py-2 text-sm">Second Tier Commission</p>
            <p className="text-gray-700 text-xs">20%</p>
          </div>
          <div className="text-left py-2">
            <p className="text-black py-2 text-sm">Referral Commission</p>
            <p className="text-gray-700 text-xs">20%</p>
          </div>
        </div>

        <div className="py-2 my-2 grid grid-cols-3 gap-4">
          <div className="text-left py-2">
            <p className="text-black py-2 text-sm">
              First Tier Payout Frequency
            </p>
            <p className="text-gray-700 text-xs">weekly</p>
          </div>

          <div className="text-left py-2">
            <p className="text-black py-2 text-sm">
              Second Tier Payout Frequency
            </p>
            <p className="text-gray-700 text-xs">weekly</p>
          </div>
          <div className="text-left py-2">
            <p className="text-black py-2 text-sm">Referral Payout Frequency</p>
            <p className="text-gray-700 text-xs">weekly</p>
          </div>
        </div>

        <div className="py-2   my-2">
          <p className="text-black py-2  text-sm">Payment Proccessor</p>
          <p className="text-gray-700 text-xs">Stripe</p>
        </div>
      </div>
    </PrivateRoute>
  );
}
