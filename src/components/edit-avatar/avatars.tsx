"use client";
import { Avatar, Button } from "@mui/material";
import { useState } from "react";
import Activeframe from "@/assets/Images/active_frame.svg";

type CategoryItem = {
  name: string;
  folder: string;
  key: string;
  count: number;
};

type CategoryList = {
  [key: string]: CategoryItem;
};

const Avatars: React.FC<{
  categoryList: CategoryList;
  selectedTab: keyof CategoryList;
  handleAvatarSelect: Function;
}> = ({ selectedTab, categoryList, handleAvatarSelect }) => {
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState<number | null>(
    null
  );

  return (
    <div className="avatar-grid">
      {Array.from(
        { length: categoryList[`${selectedTab}`]?.count || 0 },
        (_, index) => (
          <Button
            key={index}
            onClick={() => {
              handleAvatarSelect(categoryList[selectedTab], index + 1);
              setSelectedAvatarIndex(index);
            }}
          >
            <div style={{ position: "relative" }}>
              <Avatar
                src={`https://cy-asset-files.codeyoung.com/avatars/${
                  categoryList[selectedTab].folder
                }/${categoryList[selectedTab].key}-${index + 1}.png`}
                alt={`Avatar ${index + 1}`}
                variant="rounded"
                className="xs:w-[48px] xs:h-[48px] lg:h-[64px] lg:w-[64px]"
                tabIndex={0}
              />
              {selectedAvatarIndex === index && (
                <img
                  src={Activeframe.src}
                  alt="Active frame"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                />
              )}
            </div>
          </Button>
        )
      )}
    </div>
  );
};

export default Avatars;
