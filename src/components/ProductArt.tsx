import type { ReactNode } from "react";
import type { ArtKind } from "../types";

type LoafProps = {
  x: number;
  y: number;
  scale?: number;
};

function CuteLoaf({ x, y, scale = 1 }: LoafProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="24" rx="38" ry="8" fill="#5A2E1B" opacity="0.14" />
      <g className="art-steam" opacity="0.75">
        <path
          d="M-14 -33 C-16 -39, -10 -43, -12 -49"
          fill="none"
          stroke="#E48873"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M0 -36 C-2 -42, 4 -46, 2 -52"
          fill="none"
          stroke="#E48873"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M14 -33 C12 -39, 18 -43, 16 -49"
          fill="none"
          stroke="#E48873"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>
      <path
        d="M-30 4h60l-5 16a8 8 0 0 1-8 6h-34a8 8 0 0 1-8-6L-30 4Z"
        fill="#E9A45B"
        stroke="#7A3E1D"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M-34 4c0-19 15-31 34-31s34 12 34 31c0 5-4 8-9 8h-50c-5 0-9-3-9-8Z"
        fill="#F5BC6B"
        stroke="#7A3E1D"
        strokeWidth="2.4"
      />
      <path
        d="M-24-6c4-11 14-16 24-16s20 5 24 16"
        fill="none"
        stroke="#DC8236"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M-12-13l4 6M0-15l4 6M12-13l4 6"
        stroke="#FFF3DC"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="-9" cy="4" r="2.6" fill="#3C2218" />
      <circle cx="9" cy="4" r="2.6" fill="#3C2218" />
      <circle cx="-10" cy="3.2" r="0.9" fill="#FFFFFF" />
      <circle cx="8" cy="3.2" r="0.9" fill="#FFFFFF" />
      <path
        d="M-5 9q5 5 10 0"
        fill="none"
        stroke="#3C2218"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <ellipse cx="-16" cy="6" rx="3.8" ry="2.1" fill="#E8715A" opacity="0.7" />
      <ellipse cx="16" cy="6" rx="3.8" ry="2.1" fill="#E8715A" opacity="0.7" />
    </g>
  );
}

function BrandEmblem({ x, y, scale = 1, color = "#C55230" }: { x: number; y: number; scale?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M0 12 C-4 -2, -14 -8, -18 -14 C-10 -10, -4 -4, 0 4 C4 -4, 10 -10, 18 -14 C14 -8, 4 -2, 0 12Z" fill={color} />
      <circle cx="0" cy="-8" r="3.6" fill={color} />
      <ellipse cx="0" cy="-16" rx="6" ry="3.2" fill="#F6B83B" />
      <path d="M-14 14 C-18 4, -25 0, -29 -5 C-22 -2, -17 2, -14 8 C-11 2, -7 -1, -4 -4 C-6 1, -11 6, -14 14Z" fill={color} opacity="0.9" />
      <circle cx="-15" cy="-2" r="3" fill={color} />
      <ellipse cx="-16" cy="-9" rx="5" ry="2.6" fill="#F6B83B" transform="rotate(-18 -16 -9)" />
      <path d="M14 14 C11 6, 6 1, 4 -4 C7 -1, 11 2, 14 8 C17 2, 22 -2, 29 -5 C25 0, 18 4, 14 14Z" fill={color} opacity="0.9" />
      <circle cx="15" cy="-2" r="3" fill={color} />
      <ellipse cx="16" cy="-9" rx="5" ry="2.6" fill="#F6B83B" transform="rotate(18 16 -9)" />
    </g>
  );
}

function StickerArt() {
  return (
    <g>
      <ellipse cx="82" cy="134" rx="46" ry="9" fill="#5A2E1B" opacity="0.12" />
      <g transform="rotate(-5 80 78)">
        <rect
          x="26"
          y="22"
          width="108"
          height="112"
          rx="26"
          fill="#FFFFFF"
          stroke="#F2B8AD"
          strokeWidth="2.5"
        />
        <rect
          x="33"
          y="29"
          width="94"
          height="98"
          rx="20"
          fill="#FFF9F4"
          stroke="#E48873"
          strokeWidth="2"
          strokeDasharray="5 5"
        />
        <CuteLoaf x={80} y={72} scale={0.78} />
        <text
          x="80"
          y="115"
          textAnchor="middle"
          fill="#C55230"
          fontFamily="Montserrat, sans-serif"
          fontSize="9.5"
          fontWeight="800"
          letterSpacing="0.06em"
        >
          1ST BAKE CLUB
        </text>
      </g>
    </g>
  );
}

function PinArt() {
  return (
    <g>
      <ellipse cx="80" cy="136" rx="42" ry="8" fill="#5A2E1B" opacity="0.14" />
      <circle cx="80" cy="80" r="50" fill="#D99B26" />
      <circle cx="80" cy="80" r="46" fill="#F7CE68" stroke="#B97D10" strokeWidth="2" />
      <circle cx="80" cy="80" r="38" fill="#FFFDF7" stroke="#E2AD3B" strokeWidth="2.5" />
      <path
        d="M80 54c4-5 12-5 15 1 3 6-2 13-15 21-13-8-18-15-15-21 3-6 11-6 15-1Z"
        fill="#E25B45"
        opacity="0.22"
      />
      <CuteLoaf x={80} y={78} scale={0.62} />
      <path d="M54 46l6-4M48 54l4-3" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      <text
        x="80"
        y="110"
        textAnchor="middle"
        fill="#A34124"
        fontFamily="Montserrat, sans-serif"
        fontSize="8.5"
        fontWeight="800"
        letterSpacing="0.08em"
      >
        KNEAD LOVE
      </text>
    </g>
  );
}

function ToteArt() {
  return (
    <g>
      <ellipse cx="80" cy="140" rx="44" ry="8" fill="#5A2E1B" opacity="0.13" />
      <path
        d="M56 56c0-20 10-32 24-32s24 12 24 32"
        fill="none"
        stroke="#C55230"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M38 54h84l-6 74a12 12 0 0 1-12 11H56a12 12 0 0 1-12-11L38 54Z"
        fill="#FFFDF8"
        stroke="#D9B89C"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M39 64h82" stroke="#EED6C2" strokeWidth="3" />
      <BrandEmblem x={80} y={92} scale={0.78} />
      <text
        x="80"
        y="117"
        textAnchor="middle"
        fill="#C55230"
        fontFamily="Montserrat, sans-serif"
        fontSize="8"
        fontWeight="800"
        letterSpacing="0.06em"
      >
        COMMUNITY LOAVES
      </text>
      <text
        x="80"
        y="126"
        textAnchor="middle"
        fill="#8A6858"
        fontFamily="Montserrat, sans-serif"
        fontSize="6.5"
        fontWeight="700"
      >
        BREADER TOGETHER
      </text>
    </g>
  );
}

function ScraperArt() {
  return (
    <g>
      <ellipse cx="80" cy="136" rx="48" ry="8" fill="#285050" opacity="0.14" />
      <g transform="rotate(-8 80 82)">
        <rect
          x="36"
          y="46"
          width="88"
          height="58"
          rx="8"
          fill="#F4F8FA"
          stroke="#6A9398"
          strokeWidth="2.5"
        />
        <path
          d="M44 52h72"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M44 96v-6M56 96v-9M68 96v-6M80 96v-9M92 96v-6M104 96v-9M116 96v-6"
          stroke="#6A9398"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <BrandEmblem x={80} y={75} scale={0.55} color="#285050" />
        <rect
          x="30"
          y="34"
          width="100"
          height="18"
          rx="9"
          fill="#D48845"
          stroke="#8C4F1E"
          strokeWidth="2.4"
        />
        <circle cx="48" cy="43" r="2.4" fill="#FFF3DC" />
        <circle cx="80" cy="43" r="2.4" fill="#FFF3DC" />
        <circle cx="112" cy="43" r="2.4" fill="#FFF3DC" />
      </g>
      <CuteLoaf x={112} y={110} scale={0.38} />
    </g>
  );
}

function ApronArt() {
  return (
    <g>
      <ellipse cx="80" cy="140" rx="42" ry="8" fill="#285050" opacity="0.13" />
      <path
        d="M64 38c0-14 8-20 16-20s16 6 16 20"
        fill="none"
        stroke="#C55230"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M42 74c-14 4-20 14-16 22M118 74c14 4 20 14 16 22"
        fill="none"
        stroke="#C55230"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M58 36h44l8 34 10 56a8 8 0 0 1-8 9H48a8 8 0 0 1-8-9l10-56 8-34Z"
        fill="#FFFBF5"
        stroke="#C9B29B"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <BrandEmblem x={80} y={62} scale={0.58} />
      <rect
        x="54"
        y="86"
        width="52"
        height="30"
        rx="6"
        fill="#F6D5C9"
        stroke="#C55230"
        strokeWidth="2"
      />
      <path d="M54 95h52" stroke="#C55230" strokeWidth="1.6" strokeDasharray="3 3" />
    </g>
  );
}

function TeeShape({
  bodyColor = "#FFFDF9",
  trimColor = "#E8C6B0",
  ringer = false,
  graphic,
}: {
  bodyColor?: string;
  trimColor?: string;
  ringer?: boolean;
  graphic: ReactNode;
}) {
  return (
    <g>
      <ellipse cx="80" cy="140" rx="44" ry="8" fill="#5A2E1B" opacity="0.12" />
      <path
        d="M44 40 63 30h34l19 10 16 20-17 12-8-10v64a8 8 0 0 1-8 8H61a8 8 0 0 1-8-8V62l-8 10-17-12 16-20Z"
        fill={bodyColor}
        stroke={trimColor}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M63 30c5 11 29 11 34 0"
        fill="none"
        stroke={ringer ? "#C55230" : trimColor}
        strokeWidth={ringer ? "4.5" : "3"}
        strokeLinecap="round"
      />
      {ringer && (
        <>
          <path d="M28 60l17 12" stroke="#C55230" strokeWidth="4" strokeLinecap="round" />
          <path d="M132 60l-17 12" stroke="#C55230" strokeWidth="4" strokeLinecap="round" />
        </>
      )}
      {graphic}
    </g>
  );
}

function TeeArt() {
  return (
    <TeeShape
      graphic={
        <g>
          <CuteLoaf x={80} y={84} scale={0.48} />
          <text
            x="80"
            y="112"
            textAnchor="middle"
            fill="#C55230"
            fontFamily="Montserrat, sans-serif"
            fontSize="7.5"
            fontWeight="800"
            letterSpacing="0.08em"
          >
            HONEY OAT CREW
          </text>
        </g>
      }
    />
  );
}

function TeeTypeArt() {
  return (
    <TeeShape
      ringer
      graphic={
        <g>
          <BrandEmblem x={80} y={74} scale={0.62} />
          <text
            x="80"
            y="98"
            textAnchor="middle"
            fill="#C55230"
            fontFamily="Montserrat, sans-serif"
            fontSize="9.5"
            fontWeight="800"
            letterSpacing="0.04em"
          >
            BREADER
          </text>
          <text
            x="80"
            y="109"
            textAnchor="middle"
            fill="#285050"
            fontFamily="Montserrat, sans-serif"
            fontSize="8"
            fontWeight="700"
            letterSpacing="0.08em"
          >
            TOGETHER
          </text>
        </g>
      }
    />
  );
}

function CrewArt() {
  return (
    <g>
      <ellipse cx="80" cy="140" rx="46" ry="8" fill="#1E3B52" opacity="0.13" />
      <path
        d="M42 44 62 32h36l20 12 14 28-16 9-8-14v59a8 8 0 0 1-8 8H60a8 8 0 0 1-8-8V67l-8 14-16-9 14-28Z"
        fill="#FFFDF9"
        stroke="#B5CBE0"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M62 32c6 12 30 12 36 0" fill="#E8F1FA" stroke="#B5CBE0" strokeWidth="2.5" />
      <path d="M73 39l7 9 7-9" fill="none" stroke="#B5CBE0" strokeWidth="2" />
      <rect x="52" y="124" width="56" height="8" rx="4" fill="#E8F1FA" stroke="#B5CBE0" strokeWidth="2" />
      <BrandEmblem x={92} y={66} scale={0.42} />
      <text
        x="80"
        y="98"
        textAnchor="middle"
        fill="#285050"
        fontFamily="Montserrat, sans-serif"
        fontSize="8"
        fontWeight="800"
        letterSpacing="0.08em"
      >
        SUNDAY RISE
      </text>
    </g>
  );
}

function HoodieArt() {
  return (
    <g>
      <ellipse cx="80" cy="142" rx="46" ry="8" fill="#5A1C12" opacity="0.22" />
      <path
        d="M54 36c4-14 14-20 26-20s22 6 26 20"
        fill="#F4D7C8"
        stroke="#8F321E"
        strokeWidth="2.5"
      />
      <path
        d="M42 44 60 34h40l18 10 14 28-16 9-8-14v60a8 8 0 0 1-8 8H60a8 8 0 0 1-8-8V67l-8 14-16-9 14-28Z"
        fill="#FFF8F1"
        stroke="#8F321E"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M64 36c5 11 27 11 32 0" fill="#E9B8A4" stroke="#8F321E" strokeWidth="2" />
      <path d="M73 43v16M87 43v16" stroke="#C55230" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="80" cy="74" r="18" fill="#FDE6B8" stroke="#C55230" strokeWidth="2" />
      <text
        x="80"
        y="74"
        textAnchor="middle"
        fill="#C55230"
        fontFamily="Montserrat, sans-serif"
        fontSize="10.5"
        fontWeight="800"
      >
        2,000
      </text>
      <text
        x="80"
        y="83"
        textAnchor="middle"
        fill="#7A3E1D"
        fontFamily="Montserrat, sans-serif"
        fontSize="5.8"
        fontWeight="800"
        letterSpacing="0.08em"
      >
        LOAVES
      </text>
      <path
        d="M60 102h40l4 18H56l4-18Z"
        fill="#F7E4D6"
        stroke="#D4A088"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </g>
  );
}

const photoArtMap: Partial<Record<ArtKind, { src: string; alt: string }>> = {
  bowlScraper: {
    src: "./products/bowl-scraper.png",
    alt: "100 Loaves Club green flexible bowl scraper",
  },
  scraper: {
    src: "./products/bench-scraper.png",
    alt: "Stainless steel bench dough scraper with wood handle",
  },
  lame: {
    src: "./products/bread-lame.png",
    alt: "Breader Together engraved round wood bread lame with red pouch and blades",
  },
  scale: {
    src: "./products/kitchen-scale.png",
    alt: "1,000 Loaves Club digital kitchen scale",
  },
};

export function ProductArt({ kind }: { kind: ArtKind }) {
  const photo = photoArtMap[kind];
  if (photo) {
    return (
      <img
        className="art art-photo"
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
      />
    );
  }
  return (
    <svg className="art" viewBox="0 0 160 160" role="img" aria-label="Merch preview illustration">
      {renderArt(kind)}
    </svg>
  );
}

function renderArt(kind: ArtKind) {
  switch (kind) {
    case "sticker":
      return <StickerArt />;
    case "pin":
      return <PinArt />;
    case "tote":
      return <ToteArt />;
    case "scraper":
    case "bowlScraper":
    case "lame":
    case "scale":
      return <ScraperArt />;
    case "apron":
      return <ApronArt />;
    case "tee":
      return <TeeArt />;
    case "teeType":
      return <TeeTypeArt />;
    case "crew":
      return <CrewArt />;
    case "hoodie":
      return <HoodieArt />;
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}
