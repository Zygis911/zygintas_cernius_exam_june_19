import { useEffect, useState, useContext } from "react";
import { fetchUserData } from "../../apis/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";

