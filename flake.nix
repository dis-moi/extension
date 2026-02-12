{
  description = "DisMoi browser extension dev environment";

  inputs = {
    # Pin to nixos-22.11 which still has nodejs-16_x
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-22.11";
  };

  outputs = { self, nixpkgs }:
    let
      supportedSystems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;
    in {
      devShells = forAllSystems (system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in {
          default = pkgs.mkShell {
            nativeBuildInputs = [
              pkgs.nodejs-16_x
              (pkgs.yarn.override { nodejs = pkgs.nodejs-16_x; })
            ];
            shellHook = ''
              export NODE_OPTIONS="--openssl-legacy-provider"
            '';
          };
        }
      );
    };
}
