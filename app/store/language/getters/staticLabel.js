export const label = (state) => {
  if (state.currentLang === "en") {
    return {
      page: {
        home: "Home",
        aboutUs: "About Us",
        contactUs: "Contact Us",
      },
      menu: {
        home: "Home",
        aboutUs: "About Us",
        contactUs: "Contact Us",
      },
      title: {
        wellcomeBack: "Wellcome Back",
      },
      button: {
        account: "account",
        logIn: "logIn",
        dashboard : "dashboard",
        logOut : "logOut",
        closeSidebar : "close sidebar",
        openSidebar : "open sidebar"
      },
      form: {
        username: "username",
        password: "password",
      },
      caption: {
        detailToLogin: "insert your detail to login to your account",
      },
    };
  } else {
    return {
      page: {
        home: "خانه",
        aboutUs: "درباره ما",
        contactUs: "ارتباط با ما",
      },
      menu: {
        home: "خانه",
        aboutUs: "درباره ما",
        contactUs: "ارتباط با ما",
      },
      title: {
        wellcomeBack: "خوش آمدید",
      },
      button: {
        account: "حساب کاربری",
        logIn: "ورود",
        dashboard : "داشبورد",
        logOut : "هروج",
        closeSidebar : "بستن ساید بار",
        openSidebar : "بازکردن ساید بار",
      },
      form: {
        username: "نام کاربری",
        password: "رمز عبور",
      },
      caption: {
        detailToLogin:
          "لطفا اطلاعات خود برای وارد شدن به حساب کاربری خود را وارد کنید",
      },
    };
  }
};