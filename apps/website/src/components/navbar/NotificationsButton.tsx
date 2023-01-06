import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

import IconNotificationOn from "../../icons/IconNotificationOn";
import { NotificationSettings } from "./NotificationSettings";

export const NotificationsButton = () => {
  return (
    <Popover as="div" className="relative flex items-center self-stretch">
      <Popover.Button className="flex gap-2 rounded-lg bg-alveus-green/50 p-2">
        <IconNotificationOn />
        <span className="hidden md:block">Notifications</span>
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Popover.Panel className="absolute top-full right-0 z-30 -mt-0.5 flex w-[320px] max-w-[calc(80vw-50px)] flex-col gap-4 rounded bg-gray-700 p-4 shadow-lg">
          <NotificationSettings />
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};