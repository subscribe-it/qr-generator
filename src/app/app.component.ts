import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import {
  FixMeLater,
  QRCodeElementType,
  QRCodeErrorCorrectionLevel,
  QRCodeModule,
} from "angularx-qrcode";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { SafeUrl } from "@angular/platform-browser";
import { ColorPickerModule } from "ngx-color-picker";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    QRCodeModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ColorPickerModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  public elementType: QRCodeElementType = "url";
  public errorCorrectionLevel: QRCodeErrorCorrectionLevel = "M";
  public qrdata = "";
  public scale = 1;
  public width = 300;
  public title = "qr-code-generator";
  public qrCodeSrc: SafeUrl | null = null;

  public colorDark = "#000000ff";
  public colorLight = "#ffffffff";

  public saveAsImage(parent: FixMeLater): void {
    let parentElement = null;

    if (this.elementType === "canvas") {
      parentElement = parent.qrcElement.nativeElement
        .querySelector("canvas")
        .toDataURL("image/png");
    } else if (this.elementType === "img" || this.elementType === "url") {
      parentElement = parent.qrcElement.nativeElement.querySelector("img").src;
    } else {
      alert("Set elementType to 'canvas', 'img' or 'url'.");
    }

    if (parentElement) {
      let blobData = this.convertBase64ToBlob(parentElement);
      const blob = new Blob([blobData], { type: "image/png" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "qr-code";
      link.click();
    }
  }

  private convertBase64ToBlob(Base64Image: string): Blob {
    const parts = Base64Image.split(";base64,");
    const imageType = parts[0].split(":")[1];
    const decodedData = window.atob(parts[1]);
    const uInt8Array = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: imageType });
  }

  public onChangeURL(url: SafeUrl): void {
    this.qrCodeSrc = url;
  }
}
