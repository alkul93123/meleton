<?php

namespace App\Http\Resources\Users\Admin;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Class CurrentResource
 * @package App\Http\Resources\Users\Admin
 *
 * @property User $resource
 */
class CurrentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->resource->id,
            'email' => $this->resource->email,
            'name' => $this->resource->name,
            'auth-token' => $this->resource->getAccessToken(),
            // 'permissions' => isset($this->getAdminRole) ? $this->getAdminRole->permissions() : ['main'],
        ];
    }
}
