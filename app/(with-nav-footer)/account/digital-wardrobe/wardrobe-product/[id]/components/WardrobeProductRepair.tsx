"use client";

import { Button } from "components/Button";
import Dialog from "components/Dialog";
import { useToggle } from "hooks/useToggle";
import React from "react";

const WardrobeProductRepair = () => {
  const { close, isOpen, open } = useToggle();

  return (
    <div className="w-full">
      <Button size="md" fullWidth variant="outline" onClick={open}>
        Repair
      </Button>
      <Dialog isOpen={isOpen} onClose={close} title="Request Repair">
        <h6 className="text-center">Coming Soon</h6>
      </Dialog>
    </div>
  );
};

export default WardrobeProductRepair;
