# About the Modal Component

This component useful for easy modal dialog in Reactjs

# How to use

1. Copy this folder to your source code (or you can copy `Modal.tsx` and `Modal.scss` files)

# Use example
```tsx
  const [Modal, setModal] = useModal(); // setModal(boolean) => set modal open/close state

  <Modal onBackClick={() => setModal(false) }>
    <p>Modal content</p>
  </Modal>
```

# References