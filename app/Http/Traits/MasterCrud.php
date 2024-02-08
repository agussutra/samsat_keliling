<?php

namespace App\Http\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

trait MasterCRUD
{

    protected $view_path;
    protected $model;
    protected $validation_rule;
    protected $validation_rule_messages;
    protected $title;
    protected $primary_key;


    protected function setModel($model)
    {
        $this->model = new $model();
    }

    protected function setValidationRule(array $rule)
    {
        $this->validation_rule = $rule ?? [];
    }

    protected function setValidationRuleMassage(array $message)
    {
        $this->validation_rule_messages = $message ?? [];
    }

    public function store(Request $request)
    {

        $rules = isset($this->validation_rule['CREATE']) ? $this->validation_rule['CREATE'] : $this->validation_rule;
        $messages = isset($this->validation_rule_messages['CREATE']) ? $this->validation_rule_messages['CREATE'] : $this->validation_rule_messages;
        
        $validatedData = $request->validate($rules, $messages);

        try {
            $this->model::create($validatedData);
            return redirect()->back();
        } catch (\Exception $ex) {
            $ex->getMessage();
            return redirect()->back();
        }
    }

    public function update(Request $request, $id)
    {
        $rules = isset($this->validation_rule['UPDATE']) ? $this->validation_rule['UPDATE'] : $this->validation_rule;
        $messages = isset($this->validation_rule_messages['UPDATE']) ? $this->validation_rule_messages['UPDATE'] : $this->validation_rule_messages;

        $validatedData = $request->validate($rules, $messages);

        try {
            $this->model->where($this->model->getKeyName(), $id)->update(($validatedData));
            return redirect()->back();
        } catch (\Exception $ex) {
            dd($ex);
            return redirect()->back();
        }
    }

    public function destroy($id)
    {
        try {
            $this->model->where($this->model->getKeyName(), $id)->delete();
            return redirect()->back();
        } catch (\Exception $ex) {
            return redirect()->back();
        }
    }
}
