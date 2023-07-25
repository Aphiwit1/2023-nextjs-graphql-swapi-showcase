import { WithNavbar } from "./WithNavbar";
import Image from "next/image";

const Navbar = () => (
  <>
    <section
      className="flex flex-col min-h-screen bg-gradient-to-r text-white bg-center bg-cover bg-fixed "
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1623476408624-721c9185d569?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80")`,
      }}
    >
      <div className="flex flex-row justify-center bg-blue-950 p-2 text-center">
        This project created by NextJS (Updated: 14.38)
      </div>
      {/* STAR WARS Logo */}
      <div className="flex items-center h-20 border-b-[1px] border-yellow-500">
        <div className="mx-auto relative px-5 max-w-screen-xl w-full flex items-center  justify-center">
          <div className="flex justify-start p-3 ">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Star_Wars_Logo..png/640px-Star_Wars_Logo..png"
              width="100px"
              height="auto"
            ></img>

          </div>
        </div>
      </div>

      {/*  Heading Caption */}
      <div className="flex-1 flex items-center justify-end">
        <div className="text-center sm:text-left pr-0 sm:pr-16 mx-auto sm:mx-0">
          <h1 className="text-6xl sm:text-[60px] font-semibold">
            Hello<br></br>StarWars
          </h1>
          <p className="font-light text-xl mt-5">
            {" "}
            Train Yourself to Let Go of<br></br>Everything You Fear to Lose.
          </p>
          <div>---- Master Yoda ----</div>
        </div>
      </div>
    </section>
  </>
);

const WrappedComponent = WithNavbar(Navbar);
export default WrappedComponent;
