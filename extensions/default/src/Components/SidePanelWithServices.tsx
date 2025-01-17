import React, { useEffect, useState } from 'react';
import { SidePanel } from '@ohif/ui';
import { PanelService, ServicesManager } from '@ohif/core';

export type SidePanelWithServicesProps = {
  servicesManager: ServicesManager;
  side: 'left' | 'right';
  className: string;
  activeTabIndex: number;
  tabs: any;
  expandedWidth?: number;
};

const SidePanelWithServices = ({
  servicesManager,
  side,
  className,
  activeTabIndex: activeTabIndexProp,
  tabs,
  expandedWidth,
}: SidePanelWithServicesProps) => {
  const panelService: PanelService = servicesManager?.services?.panelService;

  // Tracks whether this SidePanel has been opened at least once since this SidePanel was inserted into the DOM.
  // Thus going to the Study List page and back to the viewer resets this flag for a SidePanel.
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(activeTabIndexProp);

  //Add State For Controling On SetActiveTabIndex & Open/Closing SidePanel By Click On Any Series
  const [tempTabIndex, setTempTabIndex] = useState<number | null>(null);

  useEffect(() => {
    if (panelService) {
      const activatePanelSubscription = panelService.subscribe(
        panelService.EVENTS.ACTIVATE_PANEL,
        (activatePanelEvent: Types.ActivatePanelEvent) => {
          if (!hasBeenOpened || activatePanelEvent.forceActive) {
            const tabIndex = tabs.findIndex(tab => tab.id === activatePanelEvent.panelId);
            if (tabIndex !== -1) {
              setActiveTabIndex(tabIndex);
            } else {
              setActiveTabIndex(null);
            }
          }
        }
      );

      return () => {
        activatePanelSubscription.unsubscribe();
      };
    }
  }, [tabs, hasBeenOpened, panelService]);

  //Add UseEffct For Reset TempTabIndex In Any Time Of Condition That Sets
  useEffect(() => {
    if (hasBeenOpened && tempTabIndex !== null) {
      setActiveTabIndex(tempTabIndex);
      setTempTabIndex(null); // Reset tempTabIndex
    }
  }, [tempTabIndex, hasBeenOpened]);

  return (
    <SidePanel
      side={side}
      className={className}
      activeTabIndex={activeTabIndex}
      tabs={tabs}
      onOpen={() => {
        setHasBeenOpened(true);
        setTempTabIndex(0);
      }}
      expandedWidth={expandedWidth}
    ></SidePanel>
  );
};

export default SidePanelWithServices;
