import React from 'react';

type AppActionsContext = {
    modelsData: any,
    setModelsData: (mdata: any) => void, 
}

export const AppActionsDataContext = React.createContext<AppActionsContext | null>(null);