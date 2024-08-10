"use client";

import { FileData } from "@/app/lib/appUtils";
import { defaultProps, Prop } from "@/app/lib/propUtils";
import { createContext, useContext, useState } from "react";

type AppContextData = {
  files: FileData[];
  setFiles: (files: FileData[]) => void;

  props: Prop[];
  setProps: (props: Prop[]) => void;
};

const appContext = createContext<AppContextData>({} as AppContextData);
const useApp = () => useContext(appContext);

function AppProvider({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<FileData[]>([]);
  const [props, setProps] = useState<Prop[]>(defaultProps);

  return (
    <appContext.Provider
      value={{
        files,
        setFiles,

        props,
        setProps,
      }}
    >
      {children}
    </appContext.Provider>
  );
}

export { useApp, AppProvider };
