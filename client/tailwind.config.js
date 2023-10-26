/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      green: {
        100: "#F1F5F3",
        200: "#E6EBE9",
        300: "#D5DFDA",
        400: "#ABC0B4",
        500: "#81A08F",
        600: "#5D7B6A",
        700: "#465C50",
        800: "#2F3E35",
        900: "#171F1B",
      },
      orange: {
        100: "#FAE6E0",
        200: "#F9DACE",
        300: "#F3B59C",
        400: "#ED906B",
        500: "#E76B39",
        600: "#C14817",
        700: "#803010",
        800: "#631F04",
        900: "#401808",
      },
      gray: {
        100: "#F6F7FC",
        200: "#F1F2F6",
        300: "#E4E6ED",
        400: "#D6D9E4",
        500: "#C8CCDB",
        600: "#9AA1B9",
        700: "#646D89",
        800: "#424C6B",
        900: "#2A2E3F",
      },
      white: "#FFFFFF",
      black: "#000000",
      red: "#B61515",
      bg: "#F7F7FB",
      vacant: "#F0F2F8",
      out: "#F0F1F8",
      occupied: "#E4ECFF",
      clean: "#E5FFFA",
      dirty: "#FFE5E5",
      inspected: "#FFF9E5",
      greencheck: "#4CBB17",
      greenhover: "#00A86B",
    },

    fontSize: {
      body3: [
        "12px",
        {
          lineHeight: "18px",
          fontWeight: "500",
        },
      ],
      body2: [
        "14px",
        {
          lineHeight: "21px",
          fontWeight: "500",
        },
      ],
      body1: [
        "16px",
        {
          lineHeight: "24px",
          fontWeight: "400",
        },
      ],
      headline5: [
        "20px",
        {
          lineHeight: "30px",
          fontWeight: "600",
        },
      ],
      headline4: [
        "28px",
        {
          lineHeight: "42px",
          fontWeight: "600",
        },
      ],
      headline3: [
        "38px",
        {
          lineHeight: "55px",
          fontWeight: "500",
        },
      ],
      headline2: [
        "64px",
        {
          lineHeight: "85px",
          fontWeight: "400",
        },
      ],
      headline1: [
        "88px",
        {
          lineHeight: "110px",
          fontWeight: "500",
        },
      ],
    },
    fontFamily: {
      inter: ["Inter"],
      "noto-serif-display": ["Noto Serif Display"],
    },
    extend: {
      backgroundImage: {
        coverLanding:
          "url('https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/cover.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvY292ZXIuanBnIiwiaWF0IjoxNjkzNjUzMTM2LCJleHAiOjE3MjUxODkxMzZ9.VuE0ucCLUgiPXxiK9H7L8Hl0_eHkMBe9WWyIQ0ZTQtU&t=2023-09-02T11%3A12%3A16.432Z')",
        coverRegister:
          "url('https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/cover.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvY292ZXIuanBnIiwiaWF0IjoxNjkzNTQ5ODk5LCJleHAiOjE3MjUwODU4OTl9.ofluVcHUiH6xRrL9B2g0lkzZoKQZEZhQNddOUH3q3FU&t=2023-09-01T06%3A31%3A39.778Z')",
        coverLogin:
          "url('https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/superior-garden-3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvc3VwZXJpb3ItZ2FyZGVuLTMiLCJpYXQiOjE2OTM1NDk2NzksImV4cCI6MTcyNTA4NTY3OX0.s3rwwqDSUUgQ_o5RwmhBssmWOz0v3UR5w-ftMYaEJI4&t=2023-09-01T06%3A27%3A59.603Z')",
      },
    },
  },

  plugins: [require("daisyui")],
};
