import { generateActions } from "../utils";

export const SHOW_LOADING = "SHOW_LOADING";
export const HIDE_LOADING = "HIDE_LOADING";


export const ADD_TO_CART = generateActions("ADD_TO_CART");
export const DELETE_CART_ITEM = generateActions("DELETE_CART_ITEM");
export const UPDATE_CART_ITEM = generateActions("UPDATE_CART_ITEM");

export const SET_ACCESS_TOKEN = generateActions("SET_ACCESS_TOKEN");
export const LOGIN = generateActions("LOGIN");
export const LOGOUT = generateActions("LOGOUT");
export const REGISTER = generateActions("REGISTER");


export const GET_ALL_PRODUCTS = generateActions("GET_ALL_PRODUCTS");
export const GET_PRODUCTS_BY_CATEGORY = generateActions("GET_PRODUCTS_BY_CATEGORY");