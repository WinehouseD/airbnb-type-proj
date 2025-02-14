const Form = ({ children, form }) => {
  return (
    <form className='flex flex-col gap-4'>
      {children}
      {form.formState.errors.root && (
        <div className='text-center text-sm text-red-500'>
          {form.formState.errors.root.message}
        </div>
      )}
    </form>
  );
};

export default Form;
