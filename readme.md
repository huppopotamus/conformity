# Conformity

### React forms for the conformist

#### What is conformity?

Conformity is a react forms library designed to make implementing forms _super_ straightforward. Most form libraries require some nonsense like wrapping every single form item in another component to connect it to the form. Conformity does this for you so you don't have to. _Conform_. Your form will benefit from all of the standard form stuff like `valid`, `dirty`, `touched`, and events without having to worry about how it all connects. Keep your component tree clean and _conform_. 

#### How to conform...

As easy as it is to conform, there is still a small amount of setup. First, create your form

```tsx
<Form name="my-form" onSubmit={...}>
</Form>
```

The one _current_ drawback here is that your form items must be react components, but you can easily make them _conform_ using the `conform` higher order component. Simply wrap your form item with `conform`

```tsx
const FormInput = () => <input type="text" />;
export default conform(FormInput);
```

`conform` will search for the nearest conformity `<Form>` in the component tree if a form name isn't supplied. Otherwise, it will attach to the provided form. This allows for forms within forms. _Conform_...

Do you need to hook into form item? _Conform_

```tsx
const { onChange, onValidate, valid, touched, dirty, fields } = useConform("form-name");
```

Be _conformist_ on field states...

```tsx
const { fields } = useConform("form-name");
const { onChange, onValidate, valid, touched, dirty } = fields["field-name"];
```

Don't want to write multiple versions of the same component when you're not using a form? `nonconformist`s can _conform_ just as easily.
_Conform_. Ignore the forms and _conform_.
```tsx
<TextInput nonconformist />
const TextInput = conform(({...}) => <input type="text" />, "conformed");
```

Using a third-party component library? _Conform_. `conform` is a wrapper that applies Conformity to your components. Wrap your third-party library components with your own that conforms. _Conform_.
```tsx
import { TextField } from "mui";
export default conform(({...rest}) => <TextField {...rest} />, "conformed");

```

Don't be unique, _conform_...

```tsx
const Conformed = () => {
  const handleSubmit = () => {...};
  return (
    <Form name="conformed" onSubmit={handleSubmit}>
      <TextInput /> {/* conformed */}
      <TextInput nonconformist />
      <Form name="further-conformed" onSubmit{handleSubmit}>
        <TextInput /> {/* futher-conformed */}
        <TextInput form="conformed" /> {/* conformed */}
      </Form>
    </Form>
  );
};

const TextInput = conform(({ name, form, onChange }) => {
  const { } = useConform(form);
  return <input name={name} form={form} type="text" onChange={onChange} />;
});
```
