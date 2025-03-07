import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { LuArrowRight } from 'react-icons/lu';
import { BsTwitterX } from "react-icons/bs";

interface TeamMemberProps {
  name: string;
  role: string;
  imageUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  Xurl: string;
}

const TeamMemberCard: React.FC<TeamMemberProps> = ({
  name,
  role,
  imageUrl,
  Xurl,
  instagramUrl,
  linkedinUrl
}) => {
  return (
    <div className="group relative w-72 h-96 mx-auto mt-6 rounded-3xl overflow-hidden transition-transform duration-300 hover:-translate-y-2">
      {/* Card Background and Image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Image
        src={imageUrl}
        alt={`${name} - ${role}`}
        layout="fill"
        objectFit="cover"
        className="rounded-3xl transition-transform duration-500 group-hover:scale-105"
      />

      {/* Content Container */}
      <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        {/* Member Info */}
        <div className="mb-4 transform transition-transform duration-300 group-hover:translate-y-0">
          <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-200 group-hover:text-gray-100 transition-colors">
            {role}
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
          {Xurl && (
            <Link
              href={Xurl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/80 transition-colors duration-200 text-white"
            >
              <BsTwitterX className="w-4 h-4" />
            </Link>
          )}
          {instagramUrl && (
            <Link
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/80 transition-colors duration-200 text-white"
            >
              <FaInstagram className="w-4 h-4" />
            </Link>
          )}
          {linkedinUrl && (
            <Link
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/80 transition-colors duration-200 text-white"
            >
              <FaLinkedinIn className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Arrow Icon */}
        <div className="absolute bottom-6 right-6">
          <div className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/80 transition-colors duration-200">
            <LuArrowRight className="w-4 h-4 text-white transform group-hover:rotate-45 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;