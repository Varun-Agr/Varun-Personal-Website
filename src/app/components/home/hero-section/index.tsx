import { getImgPath } from "@/utils/image";
import Image from "next/image";

const index = () => {
  return (
    <section className="relative hero-section overflow-hidden pt-35 md:pt-40 pb-12 lg:pb-30 xl:pt-52" id="home">
      <div className="container">
        <div className="lg:flex grid grid-cols-1 sm:grid-cols-2 gap-7 md:gap-4 items-center">
          <div className="flex flex-col gap-4 md:gap-7 max-w-2xl">
            <div>
              <div className="flex items-center gap-8">
                <h1>I&apos;m Varun!</h1>
                {/* <div className="wave">
                  <Image
                    src={getImgPath("/images/home/banner/wave-icon.svg")}
                    alt="wave-icon"
                    width={62}
                    height={62}
                    className=""
                  />
                </div> */}
              </div>
            </div>
            <p className="text-secondary font-normal max-w-md xl:max-w-xl">
            I bring <strong>7+ years</strong> of experience sourcing, identifying, and evaluating top <strong>1%</strong> top STEM talent (scientists, researchers, and engineers) so that you can assemble an A-team for your vision.
            I have helped frontier AI research labs like <strong>FAR.AI, UK AISI</strong>, and many others find the right person for their job. If this aligns with your vision, let's talk!
            Or check out my projects in more detail below!
            </p>
          </div>
          {/* <Image
            src={getImgPath("/images/home/banner/resume-bg-img.svg")}
            alt="banner-img"
            width={685}
            height={650}
            className="block lg:hidden"
          /> */}
        </div>
      </div>
      <div className="absolute right-0 top-0 hidden h-auto w-1/2 lg:block 2xl:h-171.5 2xl:w-187.5">
        <Image
          src={getImgPath("/images/home/banner/banner-img-2.png")}
          alt="banner-img"
          width={685}
          height={650}
          className=" absolute right-0 top-0 z-1"
        />
      </div>
    </section>
  );
};

export default index;
