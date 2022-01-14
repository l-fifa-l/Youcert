import React from "react";
import NextLink from "next/link";
import {} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import UserInfo from "../../components/UserInfo";

export default function User() {
  return (
    <>
      <UserInfo />
    </>
  );
}
