import { DeveloperDetails } from "@/dev-constants/details";
import { ExperienceData } from "@/dev-constants/experience";
import { ProjectsData } from "@/dev-constants/projects";
import { TechStacksList } from "@/dev-constants/stack";

/**
 * Extra server-rendered copy with H2/H3 hierarchy for no-JS crawlers.
 * Kept visually hidden so the existing homepage composition is unchanged.
 * The visible H1 remains in DeveloperIntro.
 */
export default function DeveloperOverview() {
  const { name, designation, bio, location, education } = DeveloperDetails;
  const stackNames = TechStacksList.map((item) => item.name).join(", ");

  return (
    <div className="sr-only">
      <p>
        {name} is a {designation}. {bio} Based in {location.city}, {location.country}.
      </p>

      <h2>Experience</h2>
      {ExperienceData.map((job) => (
        <section key={job.company}>
          <h3>
            {job.company} — {job.designation}
          </h3>
          <p>
            {job.startDate} – {job.endDate}. {job.type}.
          </p>
          {job.description.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </section>
      ))}

      <h2>Work</h2>
      {ProjectsData.map((project) => (
        <section key={project.title}>
          <h3>{project.title}</h3>
          <p>{project.tagline}</p>
          <p>{project.description}</p>
        </section>
      ))}

      <h2>Education</h2>
      {education.map((edu) => (
        <section key={edu.institution}>
          <h3>{edu.institution}</h3>
          <p>
            {edu.degree}. {edu.startDate} – {edu.endDate}. {edu.location}.
          </p>
        </section>
      ))}

      <h2>Stack</h2>
      <p>Tools used regularly: {stackNames}.</p>
    </div>
  );
}
