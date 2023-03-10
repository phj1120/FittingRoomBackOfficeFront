// Composables
import {createRouter, createWebHistory} from 'vue-router'
import VueCookies from "vue-cookies";


const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/seller',
    name: 'SellerPage',
    redirect: '/seller/product'
  },
  {
    path: '/seller/product',
    name: 'SellerProductPage',
    redirect: '/seller/product/list',
    children: [
      {
        path: 'list',
        name: 'SellerProductListPage',
        component: () => import('@/views/seller/product/SellerProductListPage.vue'),
      },
      {
        path: 'add',
        name: 'SellerProductAddPage',
        component: () => import('@/views/seller/product/SellerProductAddPage.vue'),
      },
      {
        path: 'update/:prNo',
        name: 'SellerProductUpdatePage',
        component: () => import('@/views/seller/product/SellerProductUpdatePage.vue'),
      },
      {
        path: 'option/:prNo',
        name: 'SellerProductOptionAddPage',
        component: () => import('@/views/seller/product/SellerProductOptionPage.vue'),
      }
    ]
  },
  {
    path: '/seller/store',
    name: 'SellerStorePage',
    redirect: '/seller/store/status',
    children: [
      {
        path: 'status',
        name: 'SellerStoreStatusPage',
        component: () => import('@/views/seller/store/SellerStoreStatusPage.vue'),
      },
      {
        path: 'request',
        name: 'SellerStoreRequestPage',
        component: () => import('@/views/seller/store/SellerStoreRequestPage.vue'),
      },
    ]
  },
  {
    path: '/seller/reservation',
    name: 'SellerReservationPage',
    redirect: '/seller/reservation/status',
    children: [
      {
        path: 'status',
        name: 'SellerReservationStatusPage',
        component: () => import('@/views/seller/reservation/SellerReservationStatusPage.vue'),
      },
      {
        path: 'history',
        name: 'SellerReservationHistoryPage',
        component: () => import('@/views/seller/reservation/SellerReservationHistoryPage.vue'),
      },
    ]
  },
  {
    path: '/seller/dress',
    name: 'SellerDressPage',
    redirect: '/seller/dress/profile',
    children: [
      {
        path: 'profile',
        name: 'SellerDressProfilePage',
        component: () => import('@/views/seller/dress/SellerDressProfilePage.vue'),
      },
      {
        path: 'request',
        name: 'SellerDressRequestPage',
        component: () => import('@/views/seller/dress/SellerDressRequestPage.vue'),
      },
    ]
  },
  {
    path: '/place',
    name: 'PlacePage',
    redirect: '/place/room'
  },
  {
    path: '/place/room',
    name: 'PlaceRoomPage',
    redirect: '/place/room/status',
    children: [
      {
        path: 'status',
        name: 'PlaceRoomStatusPage',
        component: () => import('@/views/place/room/PlaceRoomStatusPage.vue'),
      },
      {
        path: 'request',
        name: 'PlaceRoomRequestPage',
        component: () => import('@/views/place/room/PlaceRoomRequestPage.vue'),
      },
    ]
  },
  {
    path: '/place/seller',
    name: 'PlaceSellerPage',
    redirect: '/place/seller/status',
    children: [
      {
        path: 'status',
        name: 'PlaceSellerStatusPage',
        component: () => import('@/views/place/seller/PlaceSellerStatusPage.vue'),
      },
      {
        path: 'list',
        name: 'PlaceSellerListPage',
        component: () => import('@/views/place/seller/PlaceSellerListPage.vue'),
      },
      {
        path: 'history',
        name: 'PlaceSellerHistoryPage',
        component: () => import('@/views/place/seller/PlaceSellerHistoryPage.vue'),
      },
    ]
  },
  {
    path: '/place/dress',
    name: 'PlaceDressPage',
    redirect: '/place/dress/profile',
    children: [
      {
        path: 'profile',
        name: 'PlaceDressProfilePage',
        component: () => import('@/views/place/dress/PlaceDressProfilePage.vue'),
      },
      {
        path: 'request',
        name: 'PlaceDressRequestPage',
        component: () => import('@/views/place/dress/PlaceDressRequestPage.vue'),
      },
    ]
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('@/views/common/LoginPage.vue'),
    meta: {filterAuth: true},
  },
  {
    path: '/logout',
    name: 'LogoutPage',
    redirect: '/',
  },
  {
    path: '/login/sellerJoin',
    name: 'SellerJoinPage',
    component: () => import('@/views/common/SellerJoinPage.vue'),
  },
  {
    path: '/join/place',
    name: 'PlaceJoinPage',
    component: () => import('@/views/common/PlaceJoinPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})


router.beforeEach((to,from)=>{
  if(to.meta.filterAuth){
    VueCookies.remove("access")
    VueCookies.remove("refresh")
    VueCookies.remove("adminType")
  }
})


export default router
