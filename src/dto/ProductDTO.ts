import { IsString, IsNotEmpty, IsNumber, IsArray, ValidateNested, IsObject, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class Picture {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    url: string;
}

class Translation {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsNotEmpty()
    locale: string;

    @IsString()
    @IsNotEmpty()
    shortname: string;

    @IsObject()
    @IsOptional()
    properties?: Record<string, any>;
}

export class ProductDTO {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Picture)
    pictures: Picture[];

    @IsString()
    @IsOptional()
    previous?: string;

    @IsNumber()
    oldId: number;

    @IsNumber()
    rating: number;

    @IsNumber()
    createdAt: number;

    @IsArray()
    @IsString({ each: true })
    funeralType: string[];

    @IsNumber()
    updatedAt: number;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsArray()
    @IsString({ each: true })
    funeralPlan: string[];

    @IsNumber()
    price: number;

    @IsString()
    @IsNotEmpty()
    id: string;

    @IsObject()
    @ValidateNested()
    @Type(() => Translation)
    translations: Translation;
}
