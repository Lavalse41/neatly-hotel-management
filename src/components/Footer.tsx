import { HashLink as Link } from "react-router-hash-link";

function Footer() {
  return (
    <>
      <footer className="px-[120px] pt-[56px] bg-green-800">
        <footer className="footer flex justify-between  bg-green-800 text-base-content">
          <div className="w-[383px]">
            <Link smooth to={location.pathname === "/" ? "/#top" : "/"}>
              <button>
                <img
                  src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/logo%20white.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvbG9nbyB3aGl0ZS5zdmciLCJpYXQiOjE2OTM1NjEyOTUsImV4cCI6MTcyNTA5NzI5NX0.rsBAS_CgCAh-wxK9ATUoNXQHhksFXHD2-ETG5s-Ruio&t=2023-09-01T09%3A41%3A34.755Z"
                  alt="Logo"
                />
              </button>
            </Link>
            <p className=" text-headline5 text-white mt-8 mb-2">Neatly Hotel</p>
            <p className="text-white">
              The best hotel for rising your experience
            </p>
          </div>
          <div className="w-[380px] text-white">
            <span className="mb-4 text-body1 mt-3">CONTACT</span>
            <div className="flex justify-start mt-4">
              <div className=" mr-4">
                <img
                  src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/icon-phone-green.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2ljb24tcGhvbmUtZ3JlZW4uc3ZnIiwiaWF0IjoxNjkzNTYwMjYzLCJleHAiOjE3MjUwOTYyNjN9.EtDhAzNiUzjh-hJfq5bwgCFMsSELecemnZiQ9EeWsfE&t=2023-09-01T09%3A24%3A23.716Z"
                  alt="Icon"
                />
              </div>
              <span className="font-normal text-body2">+66 99 999 9999</span>
            </div>
            <div className="flex justify-start mt-5">
              <div className=" mr-4 flex ">
                <img
                  src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/icon-email-green.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2ljb24tZW1haWwtZ3JlZW4uc3ZnIiwiaWF0IjoxNjkzNTYwNDg4LCJleHAiOjE3MjUwOTY0ODh9.Jx-TmU9pFrZEbX_-VONpWqx60ZF-N0PYCViSQBntQGY&t=2023-09-01T09%3A28%3A08.136Z"
                  alt="Icon"
                />
              </div>
              <span className="font-normal text-body1">
                contact@neatlyhotel.com
              </span>
            </div>
            <div className="flex justify-start mt-5 ">
              <div className=" mr-4 ">
                <img
                  src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/icon-location-green.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2ljb24tbG9jYXRpb24tZ3JlZW4uc3ZnIiwiaWF0IjoxNjkzNTYwNDYxLCJleHAiOjE3MjUwOTY0NjF9.Rd5nDZ7HAJZl4aZ1jpJFpKqm1wnUR9YsKol-3mwl7C4&t=2023-09-01T09%3A27%3A40.935Z"
                  alt="Icon"
                />
              </div>
              <span className="font-normal text-body2">
                188 Phaya Thai Rd, Thung Phaya Thai, <br />
                Ratchathewi, Bangkok 10400
              </span>
            </div>
          </div>
        </footer>
        <footer className="footer flex justify-between  py-[40px] border-t-[2px] mt-[90px] border-green-700 bg-green-800 text-base-content ">
          <div className="md:place-self-center md:justify-self-end">
            <div className="grid grid-flow-col gap-4">
              <a
                className="scale-125 mx-1 hover:cursor-pointer "
                href="https://www.facebook.com/"
                target="_blank"
              >
                <img
                  alt="facebook"
                  src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/Facebook.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL0ZhY2Vib29rLnN2ZyIsImlhdCI6MTY5MzgwMjgxMiwiZXhwIjoxNzI1MzM4ODEyfQ.TfigdLGJTpEzKqSo-HT23AxYpQVsvB5r0NcGTw50Zo4&t=2023-09-04T04%3A46%3A53.118Z"
                />
              </a>
              <a
                className="scale-125 mx-1 hover:cursor-pointer"
                href="https://www.instagram.com/"
                target="_blank"
              >
                <img
                  alt="instagram"
                  src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/Instagram.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL0luc3RhZ3JhbS5zdmciLCJpYXQiOjE2OTM4MDMyNTMsImV4cCI6MTcyNTMzOTI1M30._i57l-ilKkoHd6xV8Oe5lxgD6izM-S59DsBD0iPfkhM&t=2023-09-04T04%3A54%3A13.674Z"
                />
              </a>
              <a
                className="scale-125 mx-1 hover:cursor-pointer"
                href="https://twitter.com/?lang=en"
                target="_blank"
              >
                <img
                  alt="twitter"
                  src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/twitter.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL3R3aXR0ZXIuc3ZnIiwiaWF0IjoxNjkzODAzMjY2LCJleHAiOjE3MjUzMzkyNjZ9.ifO2aDvlRNIa0qJe0dy2pz1UTlvbAXiLd3CW100uH54&t=2023-09-04T04%3A54%3A26.760Z"
                />
              </a>
            </div>
          </div>
          <div className="text-green-300 items-center grid-flow-col">
            <p>Copyright ©2022 Neatly Hotel</p>
          </div>
        </footer>
      </footer>
    </>
  );
}

export default Footer;
