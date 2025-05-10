// app/_components/TagInitializer.tsx
"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetTagListQuery } from "@/app/store/apis/tagApis";
import { addTags } from "@/app/store/slices/tagSlice";

export default function FetchTag() {
  const dispatch = useDispatch();
  const { data: tagsList, isLoading } = useGetTagListQuery();

  useEffect(() => {
    if (tagsList?.data?.data) {
      dispatch(addTags(tagsList.data.data));
    }
  }, [tagsList, dispatch]);

  return null;
}
