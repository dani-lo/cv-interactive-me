import React from 'react';

type AppResourcesContext = {
    modelsData: any,
    setModelsData: (mdata: any) => void, 
}

export const AppResourcesDataContext = React.createContext<AppResourcesContext | null>(null);