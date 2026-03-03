import { GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { DeveloperDetails } from "@/dev-constants/details";

const DeveloperEducation = () => {
  const educationData = DeveloperDetails.education;

  return (
    <ShellWrapper>
      <div className="space-y-3 p-2">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Education</p>
          <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            Academic Background
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            My educational journey that shaped my foundation in technology and problem-solving.
          </p>
        </header>

        <div className="flex flex-col space-y-3">
          {educationData.map((education, index) => (
            <div key={education.institution} className="relative flex items-start justify-between">
              {/* Connecting line */}
              {index < educationData.length - 1 && (
                <div className="absolute left-[20px] top-[44px] bottom-[-16px] w-px bg-muted-foreground/30" />
              )}
              <div className="flex space-x-2">
                <div className="aspect-square bg-muted h-10 flex items-center justify-center border rounded mt-1 relative z-10">
                  {education.logo ? (
                    <Image
                      src={education.logo}
                      alt={`${education.institution} logo`}
                      width={32}
                      height={32}
                      sizes="32px"
                      className="h-8 w-8 rounded object-contain"
                      title={education.institution}
                    />
                  ) : (
                    <div className="flex size-8 items-center justify-center mt-1 rounded bg-muted/40">
                      <GraduationCap className="size-5 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="space-y-1 pl-3">
                  <h3 className="text-lg font-medium text-foreground md:text-xl">
                    {education.institution}
                  </h3>
                  <p className="text-sm text-muted-foreground">{education.degree}</p>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="size-4" />
                    <span>{education.location}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {education.startDate} - {education.endDate}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ShellWrapper>
  );
};

export default DeveloperEducation;
