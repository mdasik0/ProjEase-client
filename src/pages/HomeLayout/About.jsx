const About = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-300">
      <div className="bg-white w-6/12 h-full overflow-y-scroll p-10">
        <h1 className="text-4xl mb-6">About Us</h1>
        <p className="text-gray-500">
          Projease is a project management tool designed to help teams
          collaborate and manage their projects efficiently. Our platform offers
          a range of features including task management, time tracking, and team
          communication to ensure that your projects are completed on time and
          within budget.
        </p>

        <h2 className="text-3xl my-6">How it started?</h2>
        <p className="text-[#1a1a1a]">
          Before ProjEase was even an idea, I was just a developer working as an
          intern, trying to make my mark. <br /> <br /> During that time, we had
          two scrums every day, and every time we needed to have a meeting, we'd
          scramble to find a space. Then, after the meeting, we had to jump to
          another application just to share the messages from the discussion.
          For task management, we were using Trello, and for chatting, we relied
          on WhatsApp. It felt like we were juggling between multiple apps, and
          the switching became such a hassle. <br /> <br />
          One day, I had an idea, Why do we need to switch between all these
          apps? What if there was a way to bring everything together in one
          place? A tool that could handle tasks, team chat, and even video
          calls, without the constant back-and-forth between different
          platforms. That was the spark that led to the creation of ProjEase.{" "}
          <br />
          <br />
          The name ("ProjEase") comes from the core idea of making project
          management easier — simplifying the process so teams could focus on
          what really matters. I wanted to create something that would not just
          help manage tasks but also bring the team together in a single,
          seamless experience.
          <br /> <br />
          As the sole developer behind this idea, I built ProjEase on a whim,
          with passion and a vision to simplify teamwork. It was a journey of
          trial and error, but in the end, I was able to combine everything —
          task management, chatting, and video calling — into one place. No more
          switching apps, no more wasted time. Just pure, efficient
          collaboration.
        </p>

        <h2 className="text-3xl my-6">The Struggles Behind ProjEase</h2>

        <p>
          Before ProjEase, I had never worked on a project quite like this. Up
          until then, my experience had been limited to assignments where the
          idea was already set, with clear instructions on how to build it, or
          team projects where I just implemented a pre-decided feature. But
          ProjEase was different. This time, the idea was mine, and I had no
          clear blueprint on how to bring it to life. <br /> <br />
          I was just starting my journey as a developer — a beginner, to be
          exact. My experience was still small, and I faced a mountain of
          decisions. I had to choose the right tech stack, design the UI, pick
          fonts and color schemes, figure out how to store data, and later, how
          to retrieve it. Even the simplest application required me to think
          deeply about where to start and how to proceed. Every feature I built
          came with its own set of challenges, and many times, I had to scrap
          what I’d done and rework it entirely. I’d create a feature, only to
          realize it didn’t fit with the way I was storing and retrieving data,
          and I’d have to start over. <br />
          <br />
          This project forced me to learn new technologies, often with no clear
          guidance on how to implement them properly. I made countless mistakes,
          had to rethink entire systems, and sometimes, I wondered if I was ever
          going to get it right. But through every struggle, I learned so much.
          I learned about the core principles of development — like memory
          leaks, component rendering, and how mounting and unmounting works in
          React. These weren’t just lessons; they were breakthroughs that helped
          me grow. <br /> <br />
          The learning curve was steep, and at times, I felt overwhelmed. Yet,
          every obstacle pushed me forward. Although some parts of the project
          are still unfinished, I know I’ll get there. I’m determined to
          complete it once I’ve mastered everything I need to. This project took
          much longer than I expected — I was only able to code for about two
          hours a day, and sometimes I missed a day here and there. But despite
          the setbacks, every line of code is a reflection of my passion, my
          struggles, and my growth. <br /> <br />
          After a long day at my full-time job, I would come home and pour all
          my energy into this project. ProjEase is the fruit of my daily
          struggles and dedication, and though it's not 100% complete, I hope
          you’ll give it a try. It’s a piece of my journey, a testament to how
          far I’ve come, and a glimpse of what’s to come as I continue to refine
          it. <br /> <br />
        </p>
      </div>
    </div>
  );
};

export default About;
